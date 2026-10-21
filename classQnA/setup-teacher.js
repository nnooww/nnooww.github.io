const crypto = require('node:crypto');
const { db } = require('./server');

try {
  const existing = db.prepare("SELECT username FROM users WHERE role = 'teacher'").get();
  if (existing) {
    console.log(`선생님 계정이 이미 있습니다. 아이디: ${existing.username}`);
    process.exitCode = 1;
  } else {
    const username = 'teacher';
    const password = crypto.randomBytes(18).toString('base64url');
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    db.prepare('INSERT INTO users(username,display_name,role,password_salt,password_hash,created_at) VALUES(?,?,?,?,?,?)')
      .run(username, '선생님', 'teacher', salt, hash, Date.now());
    console.log(`선생님 아이디: ${username}\n선생님 비밀번호: ${password}`);
  }
} finally {
  db.close();
}
