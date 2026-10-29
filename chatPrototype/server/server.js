'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

// Keep the default prototype database separate from the original app's database.
const clientRoot = path.resolve(__dirname, '..', 'client');
const dbFile = process.env.DB_FILE === ':memory:'
  ? ':memory:'
  : path.resolve(process.env.DB_FILE || path.join(__dirname, 'data', 'chat.sqlite'));
if (dbFile !== ':memory:') fs.mkdirSync(path.dirname(dbFile), { recursive: true });
const db = new DatabaseSync(dbFile);
db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 5000;
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL COLLATE NOCASE UNIQUE,
    role TEXT NOT NULL CHECK(role IN ('student', 'teacher')),
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE UNIQUE INDEX IF NOT EXISTS one_teacher ON users(role) WHERE role = 'teacher';
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS threads (
    id TEXT PRIMARY KEY,
    visibility TEXT NOT NULL CHECK(visibility IN ('public', 'private')),
    student_id INTEGER NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS threads_updated ON threads(updated_at DESC, id);
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thread_id TEXT NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    author_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS messages_thread_order ON messages(thread_id, created_at, id);
`);

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3100);
const secureCookie = process.env.COOKIE_SECURE === '1';

function sendJson(res, status, data, headers = {}) {
  const bytes = Buffer.from(JSON.stringify(data));
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': bytes.length,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...headers
  });
  res.end(bytes);
}
function fail(res, status, error) { sendJson(res, status, { error }); }
function clean(value, max) { return typeof value === 'string' ? value.trim().slice(0, max) : ''; }
function windowStart(url) {
  const raw = url.searchParams.get('since');
  if (raw === null) return 0;
  if (!/^(0|[1-9][0-9]*)$/.test(raw) || !Number.isSafeInteger(Number(raw)))
    throw { status: 400, message: '대화 시작 시간이 올바르지 않습니다.' };
  return Number(raw);
}
function tokenHash(token) { return crypto.createHash('sha256').update(token).digest('hex'); }
function passwordHash(password, salt) { return crypto.scryptSync(password, salt, 64).toString('hex'); }
function seedDemoAccounts() {
  if (process.env.DEMO_MODE !== '1') return;
  db.exec('BEGIN IMMEDIATE');
  try {
    // A demo server gets these accounts only when its separate DB is brand new.
    // Restarting never resets passwords, sessions, questions, or messages.
    if (db.prepare('SELECT count(*) AS count FROM users').get().count === 0) {
      const insert = db.prepare(`INSERT INTO users(username,display_name,role,password_salt,password_hash,created_at)
        VALUES(?,?,?,?,?,?)`);
      const now = Date.now();
      for (const [username, displayName, role] of [
        ['teacher_demo', '선생님', 'teacher'],
        ['student_demo', '시연 학생', 'student']
      ]) {
        const salt = crypto.randomBytes(16).toString('hex');
        insert.run(username, displayName, role, salt, passwordHash('12345678', salt), now);
      }
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}
seedDemoAccounts();
function cookie(req, name) {
  const match = (req.headers.cookie || '').split(';').map(part => part.trim()).find(part => part.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : '';
}
function currentUser(req) {
  const token = cookie(req, 'session');
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  return db.prepare(`SELECT u.id, u.username, u.display_name AS displayName, u.role
    FROM sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > ?`).get(tokenHash(token), Date.now()) || null;
}
function publicUser(user) {
  return { id: user.id, username: user.username, displayName: user.displayName, role: user.role };
}
function sessionCookie(token, maxAge) {
  return `session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secureCookie ? '; Secure' : ''}`;
}
function createSession(res, user) {
  const token = crypto.randomBytes(32).toString('hex');
  const maxAge = 7 * 24 * 60 * 60;
  db.prepare('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)')
    .run(tokenHash(token), user.id, Date.now() + maxAge * 1000);
  sendJson(res, 200, { user: publicUser(user) }, { 'Set-Cookie': sessionCookie(token, maxAge) });
}
function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).host === req.headers.host; }
  catch { return false; }
}
function isLoopbackAddress(address) {
  return address === '::1' || address === '127.0.0.1' || address === '::ffff:127.0.0.1';
}
function readJson(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > 16 * 1024) {
        chunks = [];
        reject({ status: 413, message: '입력 내용이 너무 깁니다.' });
        req.resume();
      } else chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const value = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
        resolve(value);
      } catch { reject({ status: 400, message: '요청 형식이 올바르지 않습니다.' }); }
    });
    req.on('error', reject);
  });
}
function threadView(row) {
  const firstVisibleMessage = row.visible_first_message;
  return {
    id: row.id,
    visibility: row.visibility,
    title: firstVisibleMessage ? firstVisibleMessage.split(/\r?\n/)[0].slice(0, 60) : row.title,
    studentId: row.student_id,
    studentName: row.student_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastMessage: row.last_message || ''
  };
}
const threadSelect = `SELECT t.*, u.display_name AS student_name,
  (SELECT m.content FROM messages m WHERE m.thread_id = t.id ORDER BY m.created_at DESC, m.id DESC LIMIT 1) AS last_message
  FROM threads t JOIN users u ON u.id = t.student_id`;
const windowThreadSelect = `SELECT t.*, u.display_name AS student_name,
  (SELECT m.content FROM messages m WHERE m.thread_id = t.id AND m.created_at >= ?
    ORDER BY m.created_at, m.id LIMIT 1) AS visible_first_message,
  (SELECT m.content FROM messages m WHERE m.thread_id = t.id AND m.created_at >= ?
    ORDER BY m.created_at DESC, m.id DESC LIMIT 1) AS last_message
  FROM threads t JOIN users u ON u.id = t.student_id`;
function visibleThread(id, user) {
  const row = db.prepare(`${threadSelect} WHERE t.id = ?`).get(id);
  if (!row || (row.visibility === 'private' && user.role !== 'teacher' && row.student_id !== user.id)) return null;
  return row;
}
function messageView(row) {
  return {
    id: row.id,
    threadId: row.thread_id,
    authorId: row.author_id,
    authorName: row.author_name,
    authorRole: row.author_role,
    content: row.content,
    createdAt: row.created_at
  };
}
function readMessage(id) {
  const row = db.prepare(`SELECT m.*, u.display_name AS author_name, u.role AS author_role
    FROM messages m JOIN users u ON u.id = m.author_id WHERE m.id = ?`).get(id);
  return messageView(row);
}

async function api(req, res, url) {
  if (req.method !== 'GET' && !originAllowed(req)) return fail(res, 403, '다른 사이트에서 보낸 요청은 받지 않습니다.');
  if (url.pathname === '/api/health' && req.method === 'GET')
    return sendJson(res, 200, { ok: true, app: 'classqna-chat-prototype' });
  if (url.pathname === '/api/join-time' && req.method === 'GET')
    return sendJson(res, 200, { joinedAt: Date.now() });
  if (url.pathname === '/api/signup-options' && req.method === 'GET') {
    return sendJson(res, 200, {
      teacherAvailable: isLoopbackAddress(req.socket.remoteAddress) &&
        !db.prepare("SELECT 1 FROM users WHERE role='teacher'").get()
    });
  }
  if (url.pathname === '/api/signup' && req.method === 'POST') {
    const input = await readJson(req);
    const displayName = clean(input.displayName, 24);
    const role = input.role;
    const password = input.password;
    if (role !== 'student' && role !== 'teacher') return fail(res, 400, '가입할 권한을 선택하세요.');
    if (role === 'teacher' && !isLoopbackAddress(req.socket.remoteAddress))
      return fail(res, 403, '선생님 계정은 서버가 실행 중인 PC에서만 만들 수 있습니다.');
    if (!displayName) return fail(res, 400, '이름을 입력하세요.');
    if (typeof password !== 'string' || password.length < 8 || password.length > 128 || !password.trim())
      return fail(res, 400, '비밀번호는 8자 이상 입력하세요.');
    if (db.prepare('SELECT 1 FROM users WHERE display_name=?').get(displayName))
      return fail(res, 409, '이미 사용 중인 이름입니다.');
    if (role === 'teacher' && db.prepare("SELECT 1 FROM users WHERE role='teacher'").get())
      return fail(res, 409, '선생님 계정은 이미 등록되어 있습니다.');
    const username = `${role}_${crypto.randomBytes(10).toString('hex')}`;
    const salt = crypto.randomBytes(16).toString('hex');
    try {
      const inserted = db.prepare(`INSERT INTO users(username,display_name,role,password_salt,password_hash,created_at)
        VALUES(?,?,?,?,?,?)`).run(username, displayName, role, salt, passwordHash(password, salt), Date.now());
      return createSession(res, { id: Number(inserted.lastInsertRowid), username, displayName, role });
    } catch (error) {
      if (String(error.message).includes('UNIQUE')) return fail(res, 409, '이미 등록된 계정입니다.');
      throw error;
    }
  }
  if (url.pathname === '/api/login' && req.method === 'POST') {
    const input = await readJson(req);
    const identifier = clean(input.username, 80);
    const candidate = typeof input.password === 'string' ? input.password : '';
    const account = db.prepare('SELECT * FROM users WHERE username=? OR display_name=?').get(identifier, identifier);
    if (!account || !candidate || !crypto.timingSafeEqual(
      Buffer.from(passwordHash(candidate, account.password_salt), 'hex'), Buffer.from(account.password_hash, 'hex')))
      return fail(res, 401, '이름·아이디 또는 비밀번호가 맞지 않습니다.');
    return createSession(res, {
      id: account.id, username: account.username, displayName: account.display_name, role: account.role
    });
  }
  if (url.pathname === '/api/logout' && req.method === 'POST') {
    const token = cookie(req, 'session');
    if (/^[a-f0-9]{64}$/.test(token)) db.prepare('DELETE FROM sessions WHERE token_hash=?').run(tokenHash(token));
    return sendJson(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) });
  }
  const user = currentUser(req);
  if (!user) return fail(res, 401, '로그인이 필요합니다.');
  if (url.pathname === '/api/me' && req.method === 'GET') return sendJson(res, 200, { user: publicUser(user) });

  if (url.pathname === '/api/announcements' && req.method === 'GET') {
    const rows = db.prepare(`SELECT a.id, a.content, a.created_at AS createdAt,
      u.display_name AS teacherName FROM announcements a JOIN users u ON u.id=a.teacher_id
      ORDER BY a.created_at DESC, a.id DESC`).all();
    return sendJson(res, 200, { announcements: rows });
  }
  if (url.pathname === '/api/announcements' && req.method === 'POST') {
    if (user.role !== 'teacher') return fail(res, 403, '선생님만 공지를 보낼 수 있습니다.');
    const input = await readJson(req);
    const content = clean(input.content, 2000);
    if (!content) return fail(res, 400, '공지 내용을 입력하세요.');
    const createdAt = Date.now();
    const inserted = db.prepare('INSERT INTO announcements(teacher_id,content,created_at) VALUES(?,?,?)')
      .run(user.id, content, createdAt);
    return sendJson(res, 201, {
      announcement: { id: Number(inserted.lastInsertRowid), content, teacherName: user.displayName, createdAt }
    });
  }

  if (url.pathname === '/api/threads' && req.method === 'GET') {
    const since = windowStart(url);
    const rows = user.role === 'teacher'
      ? db.prepare(`${windowThreadSelect} WHERE EXISTS (
          SELECT 1 FROM messages m WHERE m.thread_id=t.id AND m.created_at >= ?
        ) ORDER BY t.updated_at DESC, t.id DESC`).all(since, since, since)
      : db.prepare(`${windowThreadSelect} WHERE (t.visibility='public' OR t.student_id=?) AND EXISTS (
          SELECT 1 FROM messages m WHERE m.thread_id=t.id AND m.created_at >= ?
        ) ORDER BY t.updated_at DESC, t.id DESC`).all(since, since, user.id, since);
    return sendJson(res, 200, { threads: rows.map(threadView) });
  }
  if (url.pathname === '/api/threads' && req.method === 'POST') {
    if (user.role !== 'student') return fail(res, 403, '학생만 질문을 시작할 수 있습니다.');
    const input = await readJson(req);
    const visibility = input.visibility;
    const content = clean(input.content, 2000);
    if (visibility !== 'public' && visibility !== 'private') return fail(res, 400, '공개 범위를 선택하세요.');
    if (!content) return fail(res, 400, '질문 내용을 입력하세요.');
    const id = crypto.randomUUID();
    const title = content.split(/\r?\n/)[0].slice(0, 60);
    const createdAt = Date.now();
    db.exec('BEGIN IMMEDIATE');
    try {
      db.prepare('INSERT INTO threads(id,visibility,student_id,title,created_at,updated_at) VALUES(?,?,?,?,?,?)')
        .run(id, visibility, user.id, title, createdAt, createdAt);
      db.prepare('INSERT INTO messages(thread_id,author_id,content,created_at) VALUES(?,?,?,?)')
        .run(id, user.id, content, createdAt);
      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
    return sendJson(res, 201, {
      thread: { id, visibility, title, studentId: user.id, studentName: user.displayName,
        createdAt, updatedAt: createdAt, lastMessage: content }
    });
  }

  const threadMatch = url.pathname.match(/^\/api\/threads\/([0-9a-f-]{36})$/);
  if (threadMatch && req.method === 'GET') {
    const since = windowStart(url);
    const row = visibleThread(threadMatch[1], user);
    if (!row) return fail(res, 404, '대화를 찾을 수 없습니다.');
    const messages = db.prepare(`SELECT m.*, u.display_name AS author_name, u.role AS author_role
      FROM messages m JOIN users u ON u.id=m.author_id WHERE m.thread_id=? AND m.created_at >= ?
      ORDER BY m.created_at, m.id`).all(row.id, since).map(messageView);
    if (!messages.length) return fail(res, 404, '대화를 찾을 수 없습니다.');
    const visibleRow = {
      ...row,
      visible_first_message: messages[0].content,
      last_message: messages[messages.length - 1].content
    };
    return sendJson(res, 200, { thread: threadView(visibleRow), messages });
  }
  const messageMatch = url.pathname.match(/^\/api\/threads\/([0-9a-f-]{36})\/messages$/);
  if (messageMatch && req.method === 'POST') {
    const row = visibleThread(messageMatch[1], user);
    if (!row) return fail(res, 404, '대화를 찾을 수 없습니다.');
    const input = await readJson(req);
    const content = clean(input.content, 2000);
    if (!content) return fail(res, 400, '메시지를 입력하세요.');
    const createdAt = Date.now();
    const inserted = db.prepare('INSERT INTO messages(thread_id,author_id,content,created_at) VALUES(?,?,?,?)')
      .run(row.id, user.id, content, createdAt);
    db.prepare('UPDATE threads SET updated_at=? WHERE id=?').run(createdAt, row.id);
    return sendJson(res, 201, { message: readMessage(Number(inserted.lastInsertRowid)) });
  }
  return fail(res, 404, '요청한 기능을 찾을 수 없습니다.');
}

const contentTypes = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2'
};
async function staticFile(req, res, url) {
  if (req.method !== 'GET') return fail(res, 404, '요청한 기능을 찾을 수 없습니다.');
  const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
  const target = path.resolve(clientRoot, `.${pathname}`);
  const relative = path.relative(clientRoot, target);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return fail(res, 404, '파일을 찾을 수 없습니다.');
  const type = contentTypes[path.extname(target)];
  if (!type) return fail(res, 404, '파일을 찾을 수 없습니다.');
  try {
    const contents = await fs.promises.readFile(target);
    res.writeHead(200, {
      'Content-Type': `${type}; charset=utf-8`,
      'Content-Length': contents.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
    });
    res.end(contents);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') return fail(res, 404, '파일을 찾을 수 없습니다.');
    throw error;
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const action = url.pathname.startsWith('/api/') ? api(req, res, url) : staticFile(req, res, url);
  action.catch(error => {
    if (!res.headersSent && !res.destroyed) fail(res, error.status || 500, error.status ? error.message : '서버 오류가 발생했습니다.');
    if (!error.status) console.error(error);
  });
});

if (require.main === module) {
  server.listen(port, host, () => {
    const address = server.address();
    console.log(`ClassQnA chat prototype: http://${host}:${address.port}`);
  });
}
module.exports = { server, db, isLoopbackAddress };
