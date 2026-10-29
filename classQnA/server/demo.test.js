'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'classqna-demo-test-'));
const dbFile = path.join(tempDir, 'chat.sqlite');
process.env.DB_FILE = dbFile;
process.env.DEMO_MODE = '1';

async function runServer(server) {
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return `http://127.0.0.1:${server.address().port}`;
}
async function request(base, route, data, cookie) {
  const response = await fetch(base + route, {
    method: data ? 'POST' : 'GET',
    headers: {
      ...(data ? { 'Content-Type': 'application/json' } : {}),
      ...(cookie ? { Cookie: cookie } : {})
    },
    body: data ? JSON.stringify(data) : undefined
  });
  return { status: response.status, cookie: response.headers.get('set-cookie')?.split(';')[0], value: await response.json() };
}
async function close(server, db) {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  db.close();
}

test('explicit demo mode seeds two accounts once and keeps chat after restart', async () => {
  const first = require('./server');
  const firstBase = await runServer(first.server);
  let hashes;
  try {
    const users = first.db.prepare('SELECT display_name,role FROM users ORDER BY id').all().map(row => ({ ...row }));
    assert.deepEqual(users, [
      { display_name: '선생님', role: 'teacher' },
      { display_name: '시연 학생', role: 'student' }
    ]);
    hashes = first.db.prepare('SELECT password_hash FROM users ORDER BY id').all();
    assert.equal((await request(firstBase, '/api/signup-options')).value.teacherAvailable, false);
    const teacher = await request(firstBase, '/api/login', { username: '선생님', password: '12345678' });
    const student = await request(firstBase, '/api/login', { username: '시연 학생', password: '12345678' });
    assert.equal(teacher.value.user.role, 'teacher');
    assert.equal(student.value.user.role, 'student');
    assert.equal((await request(firstBase, '/api/announcements', { content: '시연 공지' }, teacher.cookie)).status, 201);
    assert.equal((await request(firstBase, '/api/public-messages', {
      content: '서버 재시작 확인 질문'
    }, student.cookie)).status, 201);
  } finally {
    await close(first.server, first.db);
  }

  delete require.cache[require.resolve('./server')];
  const second = require('./server');
  const secondBase = await runServer(second.server);
  try {
    assert.equal(second.db.prepare('SELECT count(*) AS count FROM users').get().count, 2);
    assert.deepEqual(second.db.prepare('SELECT password_hash FROM users ORDER BY id').all(), hashes);
    const student = await request(secondBase, '/api/login', { username: '시연 학생', password: '12345678' });
    assert.equal(student.status, 200);
    assert.equal((await request(secondBase, '/api/announcements', undefined, student.cookie)).value.announcements[0].content, '시연 공지');
    assert.equal((await request(secondBase, '/api/public-messages', undefined, student.cookie)).value.messages[0].content,
      '서버 재시작 확인 질문');
  } finally {
    await close(second.server, second.db);
    const tempRoot = path.resolve(os.tmpdir()) + path.sep;
    assert.ok(path.resolve(tempDir).startsWith(tempRoot));
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
