const $ = id => document.getElementById(id);
const state = {
  user: null,
  joinedAt: null,
  view: 'public',
  selectedThreadId: null,
  pendingThread: null,
  announcements: [],
  publicMessages: [],
  threads: [],
  detail: null,
  creating: false,
  refreshing: false,
  refreshQueued: false,
  listKey: '',
  messageKey: ''
};

function node(tag, text, className) {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  if (className) item.className = className;
  return item;
}

async function api(path, method = 'GET', data) {
  const response = await fetch(path, {
    method,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: data === undefined ? undefined : JSON.stringify(data)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || '요청에 실패했습니다.');
    error.status = response.status;
    throw error;
  }
  return result;
}

function visibleSinceJoining(path) {
  return `${path}?since=${state.joinedAt}`;
}

function displayName(account) {
  return account?.displayName || account?.username || '사용자';
}

function time(value) {
  if (!value) return '';
  return new Date(value).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

function showAuth(mode = 'choice') {
  state.user = null;
  state.detail = null;
  state.selectedThreadId = null;
  state.pendingThread = null;
  state.creating = false;
  state.listKey = '';
  state.messageKey = '';
  $('message-input').value = '';
  $('auth-view').hidden = false;
  $('app-view').hidden = true;
  $('login-form').hidden = mode !== 'login';
  $('signup-form').hidden = mode !== 'signup';
  $('show-login').classList.toggle('active', mode === 'login');
  $('show-signup').classList.toggle('active', mode === 'signup');
  $('auth-error').textContent = '';
  if (mode === 'signup') loadSignupOptions();
}

async function loadSignupOptions() {
  $('signup-teacher').disabled = true;
  $('teacher-availability').textContent = '';
  try {
    const { teacherAvailable } = await api('/api/signup-options');
    if ($('signup-form').hidden) return;
    $('signup-teacher').disabled = !teacherAvailable;
    $('teacher-availability').textContent = teacherAvailable ? '' : '선생님 계정이 이미 있습니다.';
    if (!teacherAvailable && $('signup-teacher').checked) {
      document.querySelector('input[name="signup-role"][value="student"]').checked = true;
    }
  } catch (error) {
    if (!$('signup-form').hidden) $('teacher-availability').textContent = error.message;
  }
}

function showApp(user) {
  state.user = user;
  state.view = user.role === 'teacher' ? 'private' : 'public';
  state.selectedThreadId = null;
  state.pendingThread = null;
  state.detail = null;
  state.creating = user.role === 'student' && state.view === 'private';
  state.announcements = [];
  state.publicMessages = [];
  state.threads = [];
  state.listKey = '';
  state.messageKey = '';
  $('message-input').value = '';
  $('auth-view').hidden = true;
  $('app-view').hidden = false;
  $('account-name').textContent = `${displayName(user)} · ${user.role === 'teacher' ? '선생님' : '학생'}`;
  $('app-error').textContent = '';
  render();
  refresh();
}

function setView(view) {
  state.view = view;
  state.selectedThreadId = null;
  state.pendingThread = null;
  state.detail = null;
  state.listKey = '';
  state.messageKey = '';
  state.creating = state.user.role === 'student' && view === 'private';
  $('message-input').value = '';
  $('app-error').textContent = '';
  render();
  refresh();
}

function threadsForView() {
  const threads = state.threads.filter(thread => thread.visibility === state.view);
  if (state.pendingThread?.visibility === state.view &&
      !threads.some(thread => thread.id === state.pendingThread.id)) {
    return [state.pendingThread, ...threads];
  }
  return threads;
}

function selectThread(id) {
  state.selectedThreadId = id;
  if (state.pendingThread?.id !== id) state.pendingThread = null;
  state.detail = null;
  state.messageKey = '';
  state.creating = false;
  $('message-input').value = '';
  $('app-error').textContent = '';
  render();
  refresh();
}

function renderNav() {
  for (const button of document.querySelectorAll('.nav-button')) {
    const active = button.dataset.view === state.view;
    button.classList.toggle('active', active);
    button.setAttribute('aria-current', active ? 'page' : 'false');
  }
}

function renderSidebar() {
  const section = $('thread-list-section');
  section.hidden = state.view !== 'private';
  if (section.hidden) return;
  $('list-title').textContent = '1:1 질문';
  $('new-thread-button').hidden = state.user.role !== 'student';
  $('new-thread-button').disabled = state.creating;
  const threads = threadsForView();
  const key = JSON.stringify([state.view, state.selectedThreadId, threads]);
  if (key === state.listKey) return;
  state.listKey = key;
  const list = $('thread-list');
  list.replaceChildren();
  if (!threads.length) {
    list.append(node('p', '질문이 없습니다.', 'sidebar-empty'));
    return;
  }
  for (const thread of threads) {
    const button = node('button', undefined, 'thread-button');
    button.type = 'button';
    button.classList.toggle('active', thread.id === state.selectedThreadId);
    button.setAttribute('aria-label', `${thread.title} ${thread.studentName || ''}`.trim());
    button.append(node('span', thread.title || '질문', 'thread-title'));
    button.append(node('span', `${thread.studentName || ''}${thread.studentName ? ' · ' : ''}${time(thread.updatedAt || thread.createdAt)}`, 'thread-meta'));
    if (thread.lastMessage) button.append(node('span', thread.lastMessage, 'thread-preview'));
    button.addEventListener('click', () => selectThread(thread.id));
    list.append(button);
  }
}

function renderMessages(messages, announcementMode = false) {
  const list = $('message-list');
  const key = JSON.stringify([state.view, state.selectedThreadId, messages]);
  if (key === state.messageKey) return;
  const keepBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 80;
  const previousScrollTop = list.scrollTop;
  state.messageKey = key;
  list.replaceChildren();
  if (!messages.length) {
    list.append(node('p', announcementMode ? '아직 공지가 없습니다.' : '아직 메시지가 없습니다.', 'empty-state'));
    return;
  }
  for (const message of [...messages].sort((a, b) => a.createdAt - b.createdAt)) {
    const own = announcementMode ? state.user.role === 'teacher' : String(message.authorId) === String(state.user.id);
    const row = node('article', undefined, `message-row${own ? ' own' : ''}${announcementMode ? ' announcement' : ''}`);
    const author = announcementMode ? (message.teacherName || '선생님') : (message.authorName || '사용자');
    row.append(node('span', author, 'message-author'));
    row.append(node('div', message.content, 'message-bubble'));
    row.append(node('time', time(message.createdAt), 'message-time'));
    list.append(row);
  }
  list.scrollTop = keepBottom ? list.scrollHeight : previousScrollTop;
}

function renderContent() {
  const messageForm = $('message-form');
  if (state.view === 'announcements') {
    $('chat-title').textContent = '전체 공지';
    $('chat-subtitle').textContent = '선생님이 모든 학생에게 보낸 공지';
    messageForm.hidden = state.user.role !== 'teacher';
    messageForm.dataset.mode = 'announcement';
    $('message-input').placeholder = '공지를 입력하세요';
    renderMessages(state.announcements, true);
    return;
  }
  if (state.view === 'public') {
    $('chat-title').textContent = '공개 질문';
    $('chat-subtitle').textContent = '';
    messageForm.hidden = false;
    messageForm.dataset.mode = 'public-room';
    $('message-input').placeholder = '메시지를 입력하세요';
    renderMessages(state.publicMessages);
    return;
  }
  if (state.user.role === 'student' && state.creating) {
    $('chat-title').textContent = '1:1 질문';
    $('chat-subtitle').textContent = '';
    messageForm.hidden = false;
    messageForm.dataset.mode = 'new-thread';
    $('message-input').placeholder = '질문을 입력하세요';
    const key = `${state.view}-new-question`;
    if (state.messageKey !== key) {
      state.messageKey = key;
      $('message-list').replaceChildren();
    }
    return;
  }
  const thread = threadsForView().find(item => item.id === state.selectedThreadId);
  if (!thread) {
    $('chat-title').textContent = '1:1 질문';
    $('chat-subtitle').textContent = '';
    messageForm.hidden = state.user.role !== 'student';
    messageForm.dataset.mode = 'new-thread';
    $('message-input').placeholder = '질문을 입력하세요';
    const key = `${state.view}-empty`;
    if (state.messageKey !== key) {
      state.messageKey = key;
      $('message-list').replaceChildren();
    }
    return;
  }
  $('chat-title').textContent = thread.title || '질문';
  $('chat-subtitle').textContent = `1:1 질문 · ${thread.studentName || '학생'}`;
  messageForm.hidden = false;
  messageForm.dataset.mode = 'thread';
  $('message-input').placeholder = '메시지를 입력하세요';
  renderMessages(state.detail?.messages || []);
}

function render() {
  if (!state.user) return;
  renderNav();
  renderSidebar();
  renderContent();
}

async function refresh() {
  if (!state.user || state.joinedAt === null) return;
  if (state.refreshing) { state.refreshQueued = true; return; }
  state.refreshing = true;
  try {
    const [noticeResult, publicResult, threadResult] = await Promise.all([
      api('/api/announcements'),
      api(visibleSinceJoining('/api/public-messages')),
      api(visibleSinceJoining('/api/threads'))
    ]);
    if (!state.user) return;
    state.announcements = noticeResult.announcements || [];
    state.publicMessages = publicResult.messages || [];
    state.threads = threadResult.threads || [];
    if (state.pendingThread && state.threads.some(thread => thread.id === state.pendingThread.id)) {
      state.pendingThread = null;
    }
    if (state.view === 'private') {
      const matching = threadsForView();
      if (!state.creating && !matching.some(item => item.id === state.selectedThreadId)) {
        state.selectedThreadId = matching[0]?.id || null;
        state.detail = null;
        state.messageKey = '';
        if (state.user.role === 'student' && !state.selectedThreadId) state.creating = true;
      }
      const selectedId = state.creating ? null : state.selectedThreadId;
      if (selectedId) {
        const detail = await api(visibleSinceJoining(`/api/threads/${encodeURIComponent(selectedId)}`));
        if (state.selectedThreadId === selectedId) state.detail = detail;
      } else {
        state.detail = null;
      }
    }
    $('app-error').textContent = '';
    render();
  } catch (error) {
    if (error.status === 401) showAuth();
    else $('app-error').textContent = error.message;
  } finally {
    state.refreshing = false;
    if (state.refreshQueued) {
      state.refreshQueued = false;
      refresh();
    }
  }
}

function openNewThread() {
  if (state.user.role !== 'student') return;
  state.creating = true;
  state.selectedThreadId = null;
  state.pendingThread = null;
  state.detail = null;
  state.listKey = '';
  state.messageKey = '';
  $('message-input').value = '';
  $('app-error').textContent = '';
  render();
  $('message-input').focus();
}

$('show-login').addEventListener('click', () => showAuth('login'));
$('show-signup').addEventListener('click', () => showAuth('signup'));

$('login-form').addEventListener('submit', async event => {
  event.preventDefault();
  $('auth-error').textContent = '';
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await joinTimeReady;
    const { user } = await api('/api/login', 'POST', { username: $('login-name').value.trim(), password: $('login-password').value });
    $('login-password').value = '';
    showApp(user);
  } catch (error) {
    $('auth-error').textContent = error.message;
  } finally { button.disabled = false; }
});

$('signup-form').addEventListener('submit', async event => {
  event.preventDefault();
  $('auth-error').textContent = '';
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await joinTimeReady;
    const { user } = await api('/api/signup', 'POST', {
      role: document.querySelector('input[name="signup-role"]:checked').value,
      displayName: $('signup-name').value.trim(),
      password: $('signup-password').value
    });
    $('signup-name').value = '';
    $('signup-password').value = '';
    showApp(user);
  } catch (error) {
    $('auth-error').textContent = error.message;
    loadSignupOptions();
  } finally { button.disabled = false; }
});

$('logout-button').addEventListener('click', async () => {
  try { await api('/api/logout', 'POST', {}); }
  finally { showAuth(); }
});

for (const button of document.querySelectorAll('.nav-button')) {
  button.addEventListener('click', () => setView(button.dataset.view));
}
$('new-thread-button').addEventListener('click', openNewThread);

$('message-form').addEventListener('submit', async event => {
  event.preventDefault();
  const content = $('message-input').value.trim();
  if (!content) return;
  const button = event.currentTarget.querySelector('button[type="submit"]');
  if (button.disabled) return;
  const mode = event.currentTarget.dataset.mode;
  const visibility = state.view;
  const selectedThreadId = state.selectedThreadId;
  button.disabled = true;
  $('app-error').textContent = '';
  try {
    if (mode === 'announcement') {
      await api('/api/announcements', 'POST', { content });
    } else if (mode === 'public-room') {
      const { message } = await api('/api/public-messages', 'POST', { content });
      if (message && !state.publicMessages.some(item => item.id === message.id)) {
        state.publicMessages = [...state.publicMessages, message];
        if (state.view === 'public') render();
      }
    } else if (mode === 'new-thread' && state.user.role === 'student') {
      const { thread } = await api('/api/threads', 'POST', { visibility, content });
      state.selectedThreadId = thread.id;
      state.pendingThread = thread;
      state.creating = false;
      state.listKey = '';
      state.messageKey = '';
    } else if (mode === 'thread' && selectedThreadId) {
      await api(`/api/threads/${encodeURIComponent(selectedThreadId)}/messages`, 'POST', { content });
    } else {
      throw new Error('질문을 선택하세요.');
    }
    $('message-input').value = '';
    await refresh();
    $('message-list').scrollTop = $('message-list').scrollHeight;
  } catch (error) { $('app-error').textContent = error.message; }
  finally { button.disabled = false; }
});

$('message-input').addEventListener('keydown', event => {
  if (event.key !== 'Enter' || event.shiftKey || event.isComposing || event.keyCode === 229) return;
  event.preventDefault();
  if (!$('message-form').hidden && !$('message-form').querySelector('button[type="submit"]').disabled) {
    $('message-form').requestSubmit();
  }
});

const joinTimeReady = api('/api/join-time').then(({ joinedAt }) => {
  if (!Number.isSafeInteger(joinedAt) || joinedAt < 0) throw new Error('서버 시각을 확인할 수 없습니다.');
  state.joinedAt = joinedAt;
});
joinTimeReady.then(() => api('/api/me')).then(({ user }) => showApp(user)).catch(error => {
  showAuth();
  if (error.status !== 401) $('auth-error').textContent = error.message;
});
setInterval(refresh, 3000);
