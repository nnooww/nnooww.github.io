const $ = id => document.getElementById(id);
let user = null;
let refreshing = false;
let adminSnapshot = '';
let databaseSnapshot = '';

function el(tag, value) { const node = document.createElement(tag); if (value !== undefined) node.textContent = value; return node; }
function showAuth(mode = 'choice') {
  user = null; $('auth-view').hidden = false; $('app-view').hidden = true;
  $('auth-view').dataset.mode = mode;
  $('signup-form').hidden = mode !== 'signup'; $('login-form').hidden = mode !== 'login';
  $('show-signup').classList.toggle('active', mode === 'signup');
  $('show-login').classList.toggle('active', mode === 'login');
  $('auth-message').textContent = '';
  if (mode === 'signup') loadSignupOptions();
}
function showApp(account) {
  user = account; $('auth-view').hidden = true; $('app-view').hidden = false;
  adminSnapshot = '';
  databaseSnapshot = '';
  $('question-message').textContent = '';
  $('account-label').textContent = `${account.displayName} (${account.role === 'student' ? '학생' : '선생님'})`;
  $('student-view').hidden = account.role !== 'student'; $('teacher-view').hidden = account.role !== 'teacher';
  $('database-button').hidden = account.role !== 'teacher' || databaseRequested();
  $('password-setup').hidden = account.role !== 'student' || !account.needsPasswordSetup;
  $('password-setup-message').textContent = '';
  if (account.role === 'teacher') showTeacherPanel(databaseRequested());
  refresh();
}
async function api(url, method = 'GET', data) {
  const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: data === undefined ? undefined : JSON.stringify(data) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || '요청에 실패했습니다.');
  return result;
}
function formatTime(value) { return new Date(value).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }); }
function formatDateTime(value) { return value ? new Date(value).toLocaleString('ko-KR') : '-'; }
function databaseRequested() { return new URLSearchParams(location.search).get('view') === 'db'; }
function showTeacherPanel(database, navigate = false) {
  if (user?.role !== 'teacher') return;
  $('teacher-questions').hidden = database;
  $('database-view').hidden = !database;
  $('database-button').hidden = database;
  $('admin-message').textContent = '';
  $('database-message').textContent = '';
  if (navigate) {
    const url = new URL(location.href);
    if (database) url.searchParams.set('view', 'db');
    else url.searchParams.delete('view');
    history.pushState(null, '', url);
  }
  if (database) databaseSnapshot = '';
  else adminSnapshot = '';
}
async function loadSignupOptions() {
  const teacher = $('signup-teacher');
  teacher.disabled = true;
  $('teacher-availability').textContent = '';
  try {
    const options = await api('/api/signup-options');
    if ($('auth-view').hidden || $('auth-view').dataset.mode !== 'signup') return;
    teacher.disabled = !options.teacherAvailable;
    $('teacher-availability').textContent = options.teacherAvailable ? '' : '선생님 계정이 이미 있습니다.';
    if (teacher.disabled && teacher.checked) document.querySelector('input[name="signup-role"][value="student"]').checked = true;
  } catch (error) {
    if (!$('auth-view').hidden && $('auth-view').dataset.mode === 'signup')
      $('teacher-availability').textContent = '선생님 가입 여부를 확인할 수 없습니다.';
  }
}
function appendTableRow(tbody, values) {
  const row = document.createElement('tr');
  for (const value of values) row.append(el('td', String(value ?? '')));
  tbody.append(row);
}
function renderDatabase(data) {
  const usersBody = $('database-users');
  const questionsBody = $('database-questions');
  usersBody.replaceChildren(); questionsBody.replaceChildren();
  for (const account of data.users) {
    appendTableRow(usersBody, [account.id, account.displayName, account.role === 'teacher' ? '선생님' : '학생', formatDateTime(account.createdAt)]);
  }
  if (!data.users.length) appendTableRow(usersBody, ['등록된 사용자가 없습니다.', '', '', '']);
  for (const question of data.questions) {
    const status = question.answer ? '완료' : '대기';
    appendTableRow(questionsBody, [question.id.slice(0, 8), question.studentName, question.title, question.detail, question.answer || '-', status, formatDateTime(question.createdAt)]);
    questionsBody.lastElementChild.firstElementChild.title = question.id;
  }
  if (!data.questions.length) appendTableRow(questionsBody, ['등록된 질문이 없습니다.', '', '', '', '', '', '']);
}

function renderMine(questions, position) {
  const box = $('my-questions'); box.replaceChildren();
  const waiting = questions.find(q => !q.answer);
  const currentPlace = waiting ? position : 0;
  $('my-position').textContent = currentPlace ? `대기 순서 ${currentPlace}번` : '대기 중인 질문 없음';
  if (!questions.length) {
    const empty = el('p', '아직 신청한 질문이 없습니다.'); empty.className = 'empty-state';
    box.append(empty); return;
  }
  for (const q of [...questions].sort((a, b) => Number(Boolean(a.answer)) - Number(Boolean(b.answer)))) {
    const item = el('article'); item.className = 'question-entry';
    const top = el('div'); top.className = 'question-top';
    const title = el('div');
    title.append(el('h3', q.title));
    const meta = el('p', `${formatTime(q.createdAt)} 신청`); meta.className = 'question-meta';
    title.append(meta);
    const status = el('span', q.answer ? '완료' : '대기'); status.className = `status${q.answer ? ' complete' : ''}`;
    top.append(title, status); item.append(top);
    if (q.detail) { const detail = el('p', q.detail); detail.className = 'question-detail'; item.append(detail); }
    if (q.answer) {
      const answer = el('div'); answer.className = 'answer';
      answer.append(el('span', '선생님 답변'), el('div', q.answer));
      answer.firstChild.className = 'answer-label'; item.append(answer);
    }
    if (!q.answer) {
      const place = el('p', currentPlace ? `${currentPlace}번째 대기 중` : '대기 중'); place.className = 'position';
      item.append(place);
      const cancel = el('button', '질문 취소'); cancel.type = 'button'; cancel.className = 'button button-danger button-small';
      cancel.addEventListener('click', async () => {
        try { await api(`/api/questions/${q.id}`, 'DELETE'); $('question-message').textContent = '질문을 취소했습니다.'; await refresh(); }
        catch (error) { $('question-message').textContent = error.message; }
      });
      item.append(cancel);
    }
    box.append(item);
  }
}
function renderAdmin(data) {
  const pending = data.questions.filter(q => !q.answer);
  $('pending-count').textContent = `${pending.length}개`;
  const drafts = new Map([...document.querySelectorAll('[data-answer-id]')].map(input => [input.dataset.answerId, input.value]));
  const expanded = new Set([...document.querySelectorAll('#admin-pending details[open]')].map(item => item.dataset.questionId));
  const pendingBox = $('admin-pending'); pendingBox.replaceChildren();
  if (!pending.length) { const empty = el('p', '답변을 기다리는 질문이 없습니다.'); empty.className = 'empty-state'; pendingBox.append(empty); }
  for (const q of pending) {
    const item = el('details'); item.className = 'question-entry teacher-question';
    item.dataset.questionId = String(q.id);
    item.open = expanded.has(String(q.id));
    const top = el('summary'); top.className = 'teacher-question-summary';
    const title = el('div');
    title.append(el('h3', q.title));
    const info = el('p', `${q.displayName} · ${new Date(q.createdAt).toLocaleString('ko-KR')}`); info.className = 'question-meta';
    title.append(info);
    top.append(title); item.append(top);
    const body = el('div'); body.className = 'teacher-question-body';
    if (q.detail) { const detail = el('p', q.detail); detail.className = 'question-detail'; body.append(detail); }
    const form = el('div'); form.className = 'answer-form';
    const reply = el('textarea');
    reply.rows = 3; reply.maxLength = 2000; reply.placeholder = '답변을 입력하세요';
    reply.dataset.answerId = q.id;
    reply.value = drafts.get(String(q.id)) ?? '';
    const send = el('button', '답변 보내기');
    send.type = 'button'; send.className = 'button button-primary button-small';
    send.addEventListener('click', async () => {
      send.disabled = true;
      try {
        await api(`/api/admin/questions/${q.id}/answer`, 'POST', { answer: reply.value });
        $('admin-message').textContent = '답변을 보냈습니다.';
        adminSnapshot = '';
        await refresh();
      } catch (error) {
        $('admin-message').textContent = error.message;
      } finally { send.disabled = false; }
    });
    form.append(reply, send); body.append(form); item.append(body); pendingBox.append(item);
  }
}
async function refresh() {
  if (!user || refreshing) return;
  refreshing = true;
  try {
    if (user.role === 'student') {
      const { position } = await api('/api/queue');
      const { questions } = await api('/api/questions');
      renderMine(questions, position);
    } else if (!$('database-view').hidden) {
      const data = await api('/api/admin/database');
      const snapshot = JSON.stringify(data);
      if (snapshot !== databaseSnapshot) { renderDatabase(data); databaseSnapshot = snapshot; }
      $('database-message').textContent = '';
    } else {
      const data = await api('/api/admin/overview');
      const snapshot = JSON.stringify(data.questions.filter(q => !q.answer));
      if (snapshot !== adminSnapshot) { renderAdmin(data); adminSnapshot = snapshot; }
    }
  } catch (error) {
    if (error.message === '로그인이 필요합니다.') showAuth();
    else if (user?.role === 'student') $('question-message').textContent = error.message;
    else $($('database-view').hidden ? 'admin-message' : 'database-message').textContent = error.message;
  } finally { refreshing = false; }
}

$('show-signup').addEventListener('click', () => showAuth('signup'));
$('show-login').addEventListener('click', () => showAuth('login'));
$('database-button').addEventListener('click', () => { showTeacherPanel(true, true); refresh(); });
$('questions-button').addEventListener('click', () => { showTeacherPanel(false, true); refresh(); });
window.addEventListener('popstate', () => { if (user?.role === 'teacher') { showTeacherPanel(databaseRequested()); refresh(); } });
$('signup-form').addEventListener('submit', async event => {
  event.preventDefault(); $('auth-message').textContent = '';
  const data = { role: document.querySelector('input[name="signup-role"]:checked').value, displayName: $('signup-name').value, password: $('signup-password').value };
  try {
    const result = await api('/api/signup', 'POST', data);
    $('signup-name').value = ''; $('signup-password').value = '';
    showApp(result.user);
  }
  catch (error) { $('auth-message').textContent = error.message; }
});
$('login-form').addEventListener('submit', async event => {
  event.preventDefault(); $('auth-message').textContent = '';
  try {
    const result = await api('/api/login', 'POST', { username: $('login-username').value, password: $('login-password').value });
    $('login-password').value = ''; showApp(result.user);
  } catch (error) { $('auth-message').textContent = error.message; }
});
$('logout-button').addEventListener('click', async () => {
  try { await api('/api/logout', 'POST', {}); } finally { showAuth(); }
});
$('password-setup-form').addEventListener('submit', async event => {
  event.preventDefault(); $('password-setup-message').textContent = '';
  try {
    await api('/api/me/password', 'POST', { password: $('setup-password').value });
    $('setup-password').value = '';
    user.needsPasswordSetup = false;
    $('password-setup').hidden = true;
  } catch (error) { $('password-setup-message').textContent = error.message; }
});
$('question-form').addEventListener('submit', async event => {
  event.preventDefault(); $('question-message').textContent = '';
  if (!$('question-detail').value.trim()) {
    $('question-message').textContent = '상세 내용을 입력해 주세요.';
    $('question-detail').focus();
    return;
  }
  try {
    await api('/api/questions', 'POST', { title: $('question-title').value, detail: $('question-detail').value });
    $('question-title').value = ''; $('question-detail').value = '';
    $('question-message').textContent = '질문을 신청했습니다.';
    await refresh();
  } catch (error) { $('question-message').textContent = error.message; }
});
api('/api/me').then(result => showApp(result.user)).catch(() => showAuth());
setInterval(refresh, 3000);
