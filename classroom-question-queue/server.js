const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const hosted = process.env.HOSTED_MODE === '1';
const dbFile = process.env.DB_FILE || path.join(root, 'data', 'questions.sqlite');
if (dbFile !== ':memory:') fs.mkdirSync(path.dirname(dbFile), { recursive: true });
const db = new DatabaseSync(dbFile);
db.exec(`
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student','teacher')),
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    password_set INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    detail TEXT NOT NULL DEFAULT '',
    answer TEXT NOT NULL DEFAULT '',
    answered_at INTEGER,
    status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting','in_progress','resolved')),
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS question_order ON questions(status, created_at, id);
  CREATE UNIQUE INDEX IF NOT EXISTS one_active_question ON questions(student_id) WHERE status IN ('waiting','in_progress');
  CREATE UNIQUE INDEX IF NOT EXISTS one_teacher_account ON users(role) WHERE role = 'teacher';
`);
const userColumns = db.prepare('PRAGMA table_info(users)').all().map(column => column.name);
if (!userColumns.includes('password_set')) db.exec('ALTER TABLE users ADD COLUMN password_set INTEGER NOT NULL DEFAULT 0');
const questionColumns = db.prepare('PRAGMA table_info(questions)').all().map(column => column.name);
if (!questionColumns.includes('answer')) db.exec("ALTER TABLE questions ADD COLUMN answer TEXT NOT NULL DEFAULT ''");
if (!questionColumns.includes('answered_at')) db.exec('ALTER TABLE questions ADD COLUMN answered_at INTEGER');
db.exec("UPDATE questions SET status = CASE WHEN trim(answer) = '' THEN 'waiting' ELSE 'resolved' END WHERE status <> CASE WHEN trim(answer) = '' THEN 'waiting' ELSE 'resolved' END");

function json(res, status, value, extraHeaders = {}) {
  const body = JSON.stringify(value);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': Buffer.byteLength(body), ...extraHeaders });
  res.end(body);
}
function fail(res, status, error) { return json(res, status, { error }); }
function text(value, max) { return typeof value === 'string' ? value.trim().slice(0, max) : ''; }
function tokenHash(token) { return crypto.createHash('sha256').update(token).digest('hex'); }
function passwordHash(password, salt) { return crypto.scryptSync(password, salt, 64).toString('hex'); }
function getCookie(req, name) {
  const part = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(`${name}=`));
  return part ? decodeURIComponent(part.slice(name.length + 1)) : '';
}
function currentUser(req) {
  const token = getCookie(req, 'session');
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  return db.prepare(`SELECT users.id, users.username, users.display_name AS displayName, users.role, users.password_set AS passwordSet
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ? AND sessions.expires_at > ?`).get(tokenHash(token), Date.now()) || null;
}
function publicUser(user) { return { id: user.id, username: user.username, displayName: user.displayName, role: user.role, needsPasswordSetup: user.role === 'student' && !user.passwordSet }; }
function createSession(res, user) {
  const token = crypto.randomBytes(32).toString('hex');
  const maxAge = 60 * 60 * 24 * 7;
  db.prepare('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)').run(tokenHash(token), user.id, Date.now() + maxAge * 1000);
  json(res, 200, { user: publicUser(user) }, { 'Set-Cookie': `session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${hosted ? '; Secure' : ''}` });
}
function question(row) {
  return { id: row.id, title: row.title, detail: row.detail, answer: row.answer, answeredAt: row.answered_at, status: row.status, createdAt: row.created_at, updatedAt: row.updated_at, displayName: row.display_name };
}
function body(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 8192) { reject(new Error('입력 내용이 너무 깁니다.')); req.destroy(); }
    });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); }
      catch { reject(new Error('요청 형식이 올바르지 않습니다.')); }
    });
    req.on('error', reject);
  });
}
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).host === req.headers.host; }
  catch { return false; }
}

async function api(req, res, url) {
  if (req.method !== 'GET' && !sameOrigin(req)) return fail(res, 403, '다른 사이트에서 보낸 요청은 받지 않습니다.');
  if (url.pathname === '/api/health' && req.method === 'GET') return json(res, 200, { ok: true });
  if (url.pathname === '/api/signup-options' && req.method === 'GET') {
    const teacherExists = db.prepare("SELECT 1 FROM users WHERE role = 'teacher'").get();
    return json(res, 200, { teacherAvailable: !hosted && !teacherExists });
  }
  if (url.pathname === '/api/signup' && req.method === 'POST') {
    const input = await body(req);
    const displayName = text(input.displayName, 24);
    const role = input.role;
    if (role !== 'student' && role !== 'teacher') return fail(res, 400, '가입할 권한을 선택하세요.');
    if (role === 'teacher' && hosted) return fail(res, 403, '선생님 계정은 관리자 설정으로 생성됩니다.');
    if (!displayName) return fail(res, 400, '이름을 입력하세요.');
    const password = input.password;
    if (typeof password !== 'string' || password.length < 8 || password.length > 128 || !password.trim())
      return fail(res, 400, '비밀번호는 8자 이상 입력하세요.');
    if (db.prepare('SELECT id FROM users WHERE display_name = ?').get(displayName))
      return fail(res, 409, '이미 사용 중인 이름입니다. 이름 뒤에 번호를 붙여 주세요.');
    if (role === 'teacher' && db.prepare("SELECT 1 FROM users WHERE role = 'teacher'").get())
      return fail(res, 409, '선생님 계정은 이미 등록되어 있습니다.');
    const username = `${role}_${crypto.randomBytes(10).toString('hex')}`;
    const salt = crypto.randomBytes(16).toString('hex');
    try {
      const result = db.prepare('INSERT INTO users(username,display_name,role,password_salt,password_hash,password_set,created_at) VALUES(?,?,?,?,?,?,?)')
        .run(username, displayName, role, salt, passwordHash(password, salt), 1, Date.now());
      return createSession(res, { id: Number(result.lastInsertRowid), username, displayName, role, passwordSet: 1 });
    } catch (error) {
      if (String(error.message).includes('UNIQUE'))
        return fail(res, 409, role === 'teacher' ? '선생님 계정은 이미 등록되어 있습니다.' : '이미 사용 중인 아이디입니다.');
      throw error;
    }
  }
  if (url.pathname === '/api/login' && req.method === 'POST') {
    const input = await body(req);
    const identifier = text(input.username, 30);
    const candidate = typeof input.password === 'string' ? input.password : '';
    const matches = db.prepare('SELECT * FROM users WHERE username = ? OR display_name = ?').all(identifier.toLowerCase(), identifier);
    const user = candidate && matches.find(account => crypto.timingSafeEqual(
      Buffer.from(passwordHash(candidate, account.password_salt), 'hex'), Buffer.from(account.password_hash, 'hex')));
    if (!user) return fail(res, 401, '이름·아이디 또는 비밀번호가 맞지 않습니다.');
    return createSession(res, { id: user.id, username: user.username, displayName: user.display_name, role: user.role, passwordSet: user.password_set });
  }
  if (url.pathname === '/api/logout' && req.method === 'POST') {
    const token = getCookie(req, 'session');
    if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash(token));
    return json(res, 200, { ok: true }, { 'Set-Cookie': `session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${hosted ? '; Secure' : ''}` });
  }
  const user = currentUser(req);
  if (!user) return fail(res, 401, '로그인이 필요합니다.');
  if (url.pathname === '/api/me' && req.method === 'GET') return json(res, 200, { user: publicUser(user) });
  if (url.pathname === '/api/me/password' && req.method === 'POST') {
    if (user.role !== 'student') return fail(res, 403, '학생 계정에서만 사용할 수 있습니다.');
    const input = await body(req);
    const password = input.password;
    if (typeof password !== 'string' || password.length < 8 || password.length > 128 || !password.trim())
      return fail(res, 400, '비밀번호는 8자 이상 입력하세요.');
    const salt = crypto.randomBytes(16).toString('hex');
    db.prepare('UPDATE users SET password_salt = ?, password_hash = ?, password_set = 1 WHERE id = ?')
      .run(salt, passwordHash(password, salt), user.id);
    return json(res, 200, { user: publicUser({ ...user, passwordSet: 1 }) });
  }
  if (url.pathname === '/api/admin/database' && req.method === 'GET') {
    if (user.role !== 'teacher') return fail(res, 403, '선생님만 볼 수 있습니다.');
    const users = db.prepare(`SELECT id, username, display_name AS displayName, role,
      created_at AS createdAt FROM users ORDER BY created_at, id`).all();
    const questions = db.prepare(`SELECT questions.id, questions.student_id AS studentId,
      users.display_name AS studentName, questions.title, questions.detail,
      questions.answer, questions.answered_at AS answeredAt, questions.status,
      questions.created_at AS createdAt, questions.updated_at AS updatedAt
      FROM questions JOIN users ON users.id = questions.student_id
      ORDER BY questions.created_at DESC, questions.id`).all();
    return json(res, 200, { users, questions });
  }
  if (url.pathname === '/api/admin/overview' && req.method === 'GET') {
    if (user.role !== 'teacher') return fail(res, 403, '선생님만 볼 수 있습니다.');
    const questions = db.prepare(`SELECT questions.id, questions.student_id AS studentId,
      users.display_name AS displayName, questions.title, questions.detail, questions.answer,
      questions.answered_at AS answeredAt, questions.status,
      questions.created_at AS createdAt, questions.updated_at AS updatedAt
      FROM questions JOIN users ON users.id = questions.student_id
      WHERE questions.status = 'waiting'
      ORDER BY questions.created_at, questions.id`).all();
    return json(res, 200, { questions });
  }
  const answerQuestion = url.pathname.match(/^\/api\/admin\/questions\/([0-9a-f-]{36})\/answer$/);
  if (answerQuestion && req.method === 'POST') {
    if (user.role !== 'teacher') return fail(res, 403, '선생님만 답변할 수 있습니다.');
    const input = await body(req);
    const answer = text(input.answer, 2000);
    if (!answer) return fail(res, 400, '답변을 입력하세요.');
    const now = Date.now();
    const result = db.prepare("UPDATE questions SET answer = ?, answered_at = ?, status = 'resolved', updated_at = ? WHERE id = ? AND status = 'waiting'")
      .run(answer, now, now, answerQuestion[1]);
    if (!result.changes) return fail(res, 404, '대기 중인 질문을 찾을 수 없습니다.');
    return json(res, 200, { ok: true });
  }
  if (url.pathname === '/api/queue' && req.method === 'GET') {
    const rows = db.prepare(`SELECT id, student_id AS studentId FROM questions
      WHERE status = 'waiting' ORDER BY created_at, id`).all();
    const position = user.role === 'student' ? rows.findIndex(row => row.studentId === user.id) + 1 : 0;
    return json(res, 200, { count: rows.length, position });
  }
  if (url.pathname === '/api/questions' && req.method === 'GET') {
    if (user.role !== 'student') return fail(res, 403, '학생만 본인 질문을 볼 수 있습니다.');
    const rows = db.prepare('SELECT * FROM questions WHERE student_id = ? ORDER BY created_at DESC').all(user.id);
    return json(res, 200, { questions: rows.map(question) });
  }
  if (url.pathname === '/api/questions' && req.method === 'POST') {
    if (user.role !== 'student') return fail(res, 403, '학생만 질문을 신청할 수 있습니다.');
    const input = await body(req);
    const title = text(input.title, 80), detail = text(input.detail, 500);
    if (!title) return fail(res, 400, '질문 제목을 입력하세요.');
    if (!detail) return fail(res, 400, '상세 내용을 입력하세요.');
    if (db.prepare("SELECT id FROM questions WHERE student_id = ? AND status = 'waiting'").get(user.id))
      return fail(res, 409, '진행 중인 질문이 있습니다.');
    const id = crypto.randomUUID(), now = Date.now();
    db.prepare('INSERT INTO questions(id,student_id,title,detail,status,created_at,updated_at) VALUES(?,?,?,?,?,?,?)')
      .run(id, user.id, title, detail, 'waiting', now, now);
    return json(res, 201, { question: { id, title, detail, status: 'waiting', createdAt: now, updatedAt: now } });
  }
  const match = url.pathname.match(/^\/api\/questions\/([0-9a-f-]{36})$/);
  if (match && req.method === 'DELETE') {
    if (user.role !== 'student') return fail(res, 403, '학생만 질문을 취소할 수 있습니다.');
    const result = db.prepare(`DELETE FROM questions WHERE id = ? AND student_id = ? AND status = 'waiting'`).run(match[1], user.id);
    if (!result.changes) return fail(res, 403, '대기 중인 본인 질문만 취소할 수 있습니다.');
    return json(res, 200, { ok: true });
  }
  return fail(res, 404, '요청한 기능을 찾을 수 없습니다.');
}

const staticFiles = { '/': 'index.html', '/index.html': 'index.html', '/app.js': 'app.js', '/style.css': 'style.css' };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) return api(req, res, url).catch(error => {
    if (!res.headersSent && !res.destroyed) fail(res, 500, '서버 오류가 발생했습니다.');
    console.error(error);
  });
  const name = staticFiles[url.pathname];
  if (req.method !== 'GET' || !name) { res.writeHead(404); return res.end('Not found'); }
  const content = fs.readFileSync(path.join(root, name));
  const contentType = name.endsWith('.js') ? 'text/javascript' : name.endsWith('.css') ? 'text/css' : 'text/html';
  res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8`, 'Content-Length': content.length, 'Cache-Control': 'no-store' });
  res.end(content);
});

if (require.main === module) server.listen(port, '0.0.0.0', () => {
  console.log(`질문 대기열: http://localhost:${port}`);
});
module.exports = { server, db };
