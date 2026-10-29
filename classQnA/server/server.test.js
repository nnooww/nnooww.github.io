'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const { DatabaseSync } = require('node:sqlite');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'classqna-chat-test-'));
const dbFile = path.join(tempDir, 'chat.sqlite');
process.env.DB_FILE = dbFile;
delete process.env.DEMO_MODE;
const { server, db, isLoopbackAddress, clearPrototypeTestContentOnce, contentResetKey } = require('./server');

test('teacher account creation gate rejects LAN addresses', () => {
  assert.equal(isLoopbackAddress('127.0.0.1'), true);
  assert.equal(isLoopbackAddress('::1'), true);
  assert.equal(isLoopbackAddress('::ffff:127.0.0.1'), true);
  assert.equal(isLoopbackAddress('192.168.1.20'), false);
  assert.equal(isLoopbackAddress('::ffff:192.168.1.20'), false);
});

test('separate clients share one public room while private chat stays private', async () => {
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  async function request(route, { method = 'GET', data, cookie, origin } = {}) {
    const response = await fetch(base + route, {
      method,
      headers: {
        ...(data ? { 'Content-Type': 'application/json' } : {}),
        ...(cookie ? { Cookie: cookie } : {}),
        ...(origin ? { Origin: origin } : {})
      },
      body: data ? JSON.stringify(data) : undefined
    });
    return {
      status: response.status,
      cookie: response.headers.get('set-cookie')?.split(';')[0],
      value: await response.json()
    };
  }
  try {
    assert.deepEqual((await request('/api/health')).value, { ok: true, app: 'classqna-chat-prototype' });
    assert.equal((await request('/api/signup-options')).value.teacherAvailable, true);
    const teacher = await request('/api/signup', {
      method: 'POST', data: { role: 'teacher', displayName: '선생님', password: 'teacher-pass-123' }
    });
    assert.equal(teacher.status, 200);
    assert.equal((await request('/api/signup-options')).value.teacherAvailable, false);
    assert.equal((await request('/api/signup', {
      method: 'POST', data: { role: 'teacher', displayName: '다른 선생님', password: 'teacher-pass-123' }
    })).status, 409);

    const alice = await request('/api/signup', {
      method: 'POST', data: { role: 'student', displayName: '학생 A', password: 'student-pass-123' }
    });
    const bob = await request('/api/signup', {
      method: 'POST', data: { role: 'student', displayName: '학생 B', password: 'student-pass-123' }
    });
    assert.equal(alice.status, 200);
    assert.equal(bob.status, 200);
    assert.equal((await request('/api/public-messages')).status, 401);
    assert.equal((await request('/api/public-messages', {
      method: 'POST', data: { content: '로그인 없는 글' }
    })).status, 401);

    const announcement = await request('/api/announcements', {
      method: 'POST', cookie: teacher.cookie, data: { content: '오늘 실습 공지' }
    });
    assert.equal(announcement.status, 201);
    assert.equal((await request('/api/announcements', { cookie: bob.cookie })).value.announcements[0].content, '오늘 실습 공지');
    assert.equal((await request('/api/announcements', {
      method: 'POST', cookie: alice.cookie, data: { content: '학생 공지 시도' }
    })).status, 403);

    const privateStart = await request('/api/threads', {
      method: 'POST', cookie: alice.cookie, data: { visibility: 'private', content: '개인 질문입니다.' }
    });
    assert.equal(privateStart.status, 201);
    const privateId = privateStart.value.thread.id;
    assert.equal((await request(`/api/threads/${privateId}`, { cookie: bob.cookie })).status, 404);
    assert.equal((await request(`/api/threads/${privateId}/messages`, {
      method: 'POST', cookie: bob.cookie, data: { content: '접근 시도' }
    })).status, 404);
    assert.equal((await request('/api/threads', { cookie: bob.cookie })).value.threads.some(x => x.id === privateId), false);
    assert.equal((await request(`/api/threads/${privateId}/messages`, {
      method: 'POST', cookie: teacher.cookie, data: { content: '선생님 1:1 답변' }
    })).status, 201);
    const privateMessages = (await request(`/api/threads/${privateId}`, { cookie: alice.cookie })).value.messages;
    assert.equal(privateMessages.length, 2);
    assert.equal(privateMessages[1].authorRole, 'teacher');

    const firstPublic = await request('/api/public-messages', {
      method: 'POST', cookie: bob.cookie, data: { content: '전체 질문입니다.' }
    });
    assert.equal(firstPublic.status, 201);
    assert.equal(firstPublic.value.message.authorName, '학생 B');
    assert.equal(firstPublic.value.message.authorRole, 'student');
    assert.equal((await request('/api/public-messages', {
      method: 'POST', cookie: alice.cookie, data: { content: '저도 궁금해요.' }
    })).status, 201);
    assert.equal((await request('/api/public-messages', {
      method: 'POST', cookie: teacher.cookie, data: { content: '함께 확인합시다.' }
    })).status, 201);
    const sharedRoom = (await request('/api/public-messages', { cookie: alice.cookie })).value.messages;
    assert.deepEqual(sharedRoom.map(item => item.content),
      ['전체 질문입니다.', '저도 궁금해요.', '함께 확인합시다.']);
    assert.deepEqual((await request('/api/public-messages', { cookie: bob.cookie })).value.messages,
      sharedRoom);
    assert.deepEqual((await request('/api/public-messages', { cookie: teacher.cookie })).value.messages,
      sharedRoom);
    assert.equal((await request('/api/public-messages', {
      method: 'POST', cookie: bob.cookie, data: { content: '   ' }
    })).status, 400);
    assert.equal((await request('/api/threads', {
      method: 'POST', cookie: bob.cookie, data: { visibility: 'public', content: '옛 방식' }
    })).status, 400);

    assert.equal((await request('/api/public-messages', {
      method: 'POST', cookie: alice.cookie, origin: 'https://another.example',
      data: { content: '다른 사이트 요청' }
    })).status, 403);

    // A new window keeps announcements but sees only later chat messages.
    const earlier = Date.now() - 10_000;
    db.prepare('UPDATE announcements SET created_at=?').run(earlier);
    db.prepare('UPDATE public_messages SET created_at=?').run(earlier);
    db.prepare('UPDATE messages SET created_at=?').run(earlier);
    db.prepare('UPDATE threads SET created_at=?, updated_at=?').run(earlier, earlier);
    const joinedAt = (await request('/api/join-time')).value.joinedAt;
    assert.ok(Number.isSafeInteger(joinedAt));
    assert.deepEqual(
      (await request('/api/announcements', { cookie: bob.cookie })).value.announcements.map(item => item.content),
      ['오늘 실습 공지']
    );
    assert.deepEqual((await request(`/api/threads?since=${joinedAt}`, { cookie: teacher.cookie })).value.threads, []);
    assert.deepEqual((await request(`/api/public-messages?since=${joinedAt}`, { cookie: bob.cookie })).value.messages, []);
    assert.equal((await request('/api/public-messages?since=invalid', { cookie: bob.cookie })).status, 400);
    assert.equal((await request('/api/threads?since=invalid', { cookie: bob.cookie })).status, 400);

    const newNotice = await request('/api/announcements', {
      method: 'POST', cookie: teacher.cookie, data: { content: '입장 후 공지' }
    });
    const newPublicMessage = await request('/api/public-messages', {
      method: 'POST', cookie: bob.cookie, data: { content: '입장 후 공개 메시지' }
    });
    const newPrivateMessage = await request(`/api/threads/${privateId}/messages`, {
      method: 'POST', cookie: teacher.cookie, data: { content: '입장 후 개인 답변' }
    });
    assert.equal(newNotice.status, 201);
    assert.equal(newPublicMessage.status, 201);
    assert.equal(newPrivateMessage.status, 201);
    const visibleNotices = (await request('/api/announcements', { cookie: alice.cookie })).value.announcements;
    assert.deepEqual(visibleNotices.map(item => item.content), ['입장 후 공지', '오늘 실습 공지']);
    const bobThreads = (await request(`/api/threads?since=${joinedAt}`, { cookie: bob.cookie })).value.threads;
    assert.deepEqual(bobThreads, []);
    assert.equal(bobThreads.some(item => item.id === privateId), false);
    const publicMessages = (await request(`/api/public-messages?since=${joinedAt}`, { cookie: alice.cookie })).value.messages;
    assert.deepEqual(publicMessages.map(item => item.content), ['입장 후 공개 메시지']);
    const privateMessagesAfterJoin = (await request(`/api/threads/${privateId}?since=${joinedAt}`, { cookie: alice.cookie })).value.messages;
    assert.deepEqual(privateMessagesAfterJoin.map(item => item.content), ['입장 후 개인 답변']);
    assert.equal((await request(`/api/threads/${privateId}?since=${joinedAt}`, { cookie: bob.cookie })).status, 404);

    const reopenedAt = Math.max(
      newNotice.value.announcement.createdAt,
      newPublicMessage.value.message.createdAt,
      newPrivateMessage.value.message.createdAt
    ) + 1;
    assert.deepEqual(
      (await request('/api/announcements', { cookie: alice.cookie })).value.announcements.map(item => item.content),
      ['입장 후 공지', '오늘 실습 공지']
    );
    assert.deepEqual((await request(`/api/threads?since=${reopenedAt}`, { cookie: teacher.cookie })).value.threads, []);
    assert.deepEqual((await request(`/api/public-messages?since=${reopenedAt}`, { cookie: teacher.cookie })).value.messages, []);

    const relogin = await request('/api/login', {
      method: 'POST', data: { username: '학생 A', password: 'student-pass-123' }
    });
    assert.equal(relogin.status, 200);
    assert.equal((await request(`/api/threads/${privateId}`, { cookie: relogin.cookie })).status, 200);

    // The migration clears only preexisting prototype content, and never runs twice.
    assert.equal(db.prepare('SELECT value FROM app_meta WHERE key=?').get(contentResetKey).value, 'done');
    assert.equal(clearPrototypeTestContentOnce(), false);
    assert.equal(db.prepare('SELECT count(*) AS count FROM public_messages').get().count, 4);
    db.prepare('DELETE FROM app_meta WHERE key=?').run(contentResetKey);
    assert.equal(clearPrototypeTestContentOnce(), true);
    for (const table of ['announcements', 'threads', 'messages', 'public_messages']) {
      assert.equal(db.prepare(`SELECT count(*) AS count FROM ${table}`).get().count, 0);
    }
    assert.equal(db.prepare('SELECT count(*) AS count FROM users').get().count, 3);
    assert.equal(db.prepare('SELECT count(*) AS count FROM sessions').get().count, 4);
    assert.equal((await request('/api/public-messages', {
      method: 'POST', cookie: alice.cookie, data: { content: '초기화 후 새 대화' }
    })).status, 201);
    assert.equal((await request('/api/announcements', {
      method: 'POST', cookie: teacher.cookie, data: { content: '초기화 후 공지' }
    })).status, 201);
    assert.equal(clearPrototypeTestContentOnce(), false);
    assert.deepEqual((await request('/api/public-messages', { cookie: bob.cookie })).value.messages
      .map(item => item.content), ['초기화 후 새 대화']);
  } finally {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    db.close();
  }
  const reopened = new DatabaseSync(dbFile);
  assert.equal(reopened.prepare('SELECT count(*) AS count FROM messages').get().count, 0);
  assert.equal(reopened.prepare('SELECT count(*) AS count FROM public_messages').get().count, 1);
  reopened.close();
  const tempRoot = path.resolve(os.tmpdir()) + path.sep;
  assert.ok(path.resolve(tempDir).startsWith(tempRoot));
  fs.rmSync(tempDir, { recursive: true, force: true });
});
