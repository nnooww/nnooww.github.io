const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { config, provisionTeacher, provisionDemoAccounts, startHosted } = require('./deploy');

const initialPassword = 'ExampleTest#2026';
const changedPassword = 'ChangedDemo#2026';

test('배포 설정과 선생님·시연 학생 계정 보호', async t => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'class-questions-deploy-'));
  const dbFile = path.join(temp, 'questions.sqlite');
  assert.throws(() => config({ TEACHER_PASSWORD: initialPassword }), /DB_FILE/);
  assert.throws(() => config({ DB_FILE: ':memory:', TEACHER_PASSWORD: initialPassword }), /DB_FILE/);
  assert.equal(config({ DB_FILE: dbFile, TEACHER_PASSWORD: initialPassword }).teacherPassword, initialPassword);
  assert.throws(() => config({ DB_FILE: dbFile, TEACHER_PASSWORD: '1234567' }), /TEACHER_PASSWORD/);
  assert.throws(() => config({ DB_FILE: dbFile, TEACHER_PASSWORD: '        ' }), /TEACHER_PASSWORD/);

  process.env.DB_FILE = dbFile;
  process.env.TEACHER_PASSWORD = initialPassword;
  process.env.PORT = '0';
  const { db, server } = startHosted();
  await new Promise(resolve => server.once('listening', resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    db.close();
    fs.rmSync(temp, { recursive: true, force: true });
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (route, { method = 'GET', body, cookie } = {}) => {
    const response = await fetch(base + route, {
      method,
      headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    return { status: response.status, data: await response.json(), setCookie: response.headers.get('set-cookie') || '' };
  };

  assert.equal(fs.existsSync(dbFile), true);
  assert.deepEqual((await call('/api/signup-options')).data, { teacherAvailable: false });
  assert.equal((await call('/api/signup', { method: 'POST', body: {
    displayName: '다른 선생님', role: 'teacher', password: initialPassword
  } })).status, 403);

  const teacher = await call('/api/login', { method: 'POST', body: { username: 'teacher', password: initialPassword } });
  assert.equal(teacher.status, 200);
  assert.equal(teacher.data.user.role, 'teacher');
  assert.equal(teacher.data.user.displayName, '선생님');
  assert.match(teacher.setCookie, /; Secure(?:;|$)/);
  const teacherCookie = teacher.setCookie.split(';')[0];
  assert.equal((await call('/api/admin/database', { cookie: teacherCookie })).status, 200);

  const student = await call('/api/login', { method: 'POST', body: { username: '시연 학생', password: initialPassword } });
  assert.equal(student.status, 200);
  assert.equal(student.data.user.role, 'student');
  assert.equal(student.data.user.displayName, '시연 학생');
  assert.equal(student.data.user.username, 'student_ec7f8b656d180e2cacde');
  assert.match(student.setCookie, /; Secure(?:;|$)/);
  const studentCookie = student.setCookie.split(';')[0];
  assert.equal((await call('/api/admin/database', { cookie: studentCookie })).status, 403);

  const beforeRestart = db.prepare('SELECT id, username, password_salt, password_hash FROM users ORDER BY id').all();
  provisionDemoAccounts(db, initialPassword);
  assert.deepEqual(db.prepare('SELECT id, username, password_salt, password_hash FROM users ORDER BY id').all(), beforeRestart);
  assert.equal(beforeRestart.length, 2);
  assert.equal((await call('/api/admin/database', { cookie: teacherCookie })).status, 200);
  assert.equal((await call('/api/me', { cookie: studentCookie })).status, 200);

  provisionDemoAccounts(db, changedPassword);
  assert.equal((await call('/api/admin/database', { cookie: teacherCookie })).status, 401);
  assert.equal((await call('/api/me', { cookie: studentCookie })).status, 401);
  assert.equal((await call('/api/login', { method: 'POST', body: { username: 'teacher', password: initialPassword } })).status, 401);
  assert.equal((await call('/api/login', { method: 'POST', body: { username: '시연 학생', password: initialPassword } })).status, 401);
  assert.equal((await call('/api/login', { method: 'POST', body: { username: 'teacher', password: changedPassword } })).status, 200);
  assert.equal((await call('/api/login', { method: 'POST', body: { username: '시연 학생', password: changedPassword } })).status, 200);

  provisionTeacher(db, initialPassword);
  const teacherBeforeCollision = await call('/api/login', { method: 'POST', body: { username: 'teacher', password: initialPassword } });
  const teacherBeforeCollisionCookie = teacherBeforeCollision.setCookie.split(';')[0];
  db.prepare("UPDATE users SET username = 'unrelated_student' WHERE display_name = '시연 학생'").run();
  assert.throws(() => provisionDemoAccounts(db, changedPassword), /덮어쓰지 않았습니다/);
  assert.equal((await call('/api/admin/database', { cookie: teacherBeforeCollisionCookie })).status, 200);
  assert.equal((await call('/api/login', { method: 'POST', body: { username: 'teacher', password: initialPassword } })).status, 200);
  assert.equal((await call('/api/login', { method: 'POST', body: { username: '시연 학생', password: changedPassword } })).status, 200);

  db.prepare("DELETE FROM users WHERE role = 'teacher'").run();
  assert.deepEqual((await call('/api/signup-options')).data, { teacherAvailable: false });
  assert.equal((await call('/api/signup', { method: 'POST', body: {
    displayName: '선점 시도', role: 'teacher', password: initialPassword
  } })).status, 403);
});
