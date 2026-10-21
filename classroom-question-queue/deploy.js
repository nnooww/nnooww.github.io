const crypto = require('node:crypto');
const path = require('node:path');

const TEACHER = { username: 'teacher', displayName: '선생님', role: 'teacher' };
const DEMO_STUDENT = { username: 'student_ec7f8b656d180e2cacde', displayName: '시연 학생', role: 'student' };

function config(env = process.env) {
  const dbFile = env.DB_FILE;
  if (!dbFile || dbFile === ':memory:' || !path.isAbsolute(dbFile)) {
    throw new Error('DB_FILE에 영구 저장소의 절대 경로를 설정하세요.');
  }

  const teacherPassword = env.TEACHER_PASSWORD;
  if (typeof teacherPassword !== 'string' || teacherPassword.length < 8 ||
      teacherPassword.length > 128 || !teacherPassword.trim()) {
    throw new Error('TEACHER_PASSWORD는 공백만으로 구성되지 않은 8~128자여야 합니다.');
  }

  const port = Number(env.PORT || 3000);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error('PORT는 0~65535 범위의 정수여야 합니다.');
  }
  return { dbFile, teacherPassword, port };
}

function transaction(db, work) {
  db.exec('BEGIN');
  try {
    const result = work();
    db.exec('COMMIT');
    return result;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function provisionAccount(db, account, password) {
  const matches = db.prepare('SELECT id, username, display_name, role, password_salt, password_hash, password_set FROM users WHERE username = ? OR display_name = ?')
    .all(account.username, account.displayName);
  if (matches.some(row => row.username !== account.username || row.display_name !== account.displayName || row.role !== account.role) || matches.length > 1) {
    throw new Error(`${account.displayName} 계정의 이름 또는 아이디가 다른 계정에 사용 중입니다. 기존 계정을 덮어쓰지 않았습니다.`);
  }
  if (account.role === 'teacher' && db.prepare("SELECT id FROM users WHERE role = 'teacher' AND username <> ?").get(account.username)) {
    throw new Error('다른 선생님 계정이 이미 있습니다. 기존 계정을 덮어쓰지 않았습니다.');
  }

  const current = matches[0];
  if (current) {
    const currentHash = crypto.scryptSync(password, current.password_salt, 64).toString('hex');
    if (currentHash === current.password_hash && current.password_set === 1) return current.id;
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  if (current) {
    db.prepare('UPDATE users SET password_salt = ?, password_hash = ?, password_set = 1 WHERE id = ?')
      .run(salt, hash, current.id);
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(current.id);
    return current.id;
  }

  const result = db.prepare('INSERT INTO users(username,display_name,role,password_salt,password_hash,password_set,created_at) VALUES(?,?,?,?,?,?,?)')
    .run(account.username, account.displayName, account.role, salt, hash, 1, Date.now());
  return Number(result.lastInsertRowid);
}

function provisionTeacher(db, password) {
  return transaction(db, () => provisionAccount(db, TEACHER, password));
}

function provisionDemoAccounts(db, password) {
  return transaction(db, () => ({
    teacherId: provisionAccount(db, TEACHER, password),
    studentId: provisionAccount(db, DEMO_STUDENT, password)
  }));
}

function startHosted() {
  const { dbFile, teacherPassword, port } = config();
  process.env.DB_FILE = dbFile;
  process.env.HOSTED_MODE = '1';
  const { db, server } = require('./server');
  try {
    provisionDemoAccounts(db, teacherPassword);
  } catch (error) {
    db.close();
    throw error;
  }
  server.listen(port, '0.0.0.0', () => {
    console.log(`질문 대기열: 포트 ${server.address().port}`);
  });
  return { db, server };
}

if (require.main === module) {
  try { startHosted(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = { config, provisionTeacher, provisionDemoAccounts, startHosted };
