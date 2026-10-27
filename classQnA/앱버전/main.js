'use strict';

const { app, BrowserWindow, Menu, session } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const APP_URL = 'https://classroom-question-queue-production.up.railway.app/';
const APP_ORIGIN = new URL(APP_URL).origin;
const OFFLINE_PATH = path.join(__dirname, 'offline.html');
const OFFLINE_URL = pathToFileURL(OFFLINE_PATH).href;
const SESSION_PARTITION = 'classqna-temporary';
const DESKTOP_CSS = fs.readFileSync(path.join(__dirname, 'desktop.css'), 'utf8');

function isAllowedNavigation(target) {
  if (target === OFFLINE_URL) return true;

  try {
    const url = new URL(target);
    return url.protocol === 'https:' && url.origin === APP_ORIGIN;
  } catch {
    return false;
  }
}

function createWindow() {
  const temporarySession = session.fromPartition(SESSION_PARTITION);
  temporarySession.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false);
  });
  temporarySession.setPermissionCheckHandler(() => false);

  const window = new BrowserWindow({
    title: '수업 질문 대기열',
    width: 800,
    height: 620,
    minWidth: 680,
    minHeight: 520,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      partition: SESSION_PARTITION,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      webviewTag: false
    }
  });

  // 질문과 로그인은 같은 Railway 서버에서만 처리한다.
  window.webContents.on('will-frame-navigate', (navigation) => {
    if (!isAllowedNavigation(navigation.url)) navigation.preventDefault();
  });
  window.webContents.on('will-navigate', (navigation) => {
    if (!isAllowedNavigation(navigation.url)) navigation.preventDefault();
  });
  window.webContents.on('will-redirect', (navigation) => {
    if (!isAllowedNavigation(navigation.url)) navigation.preventDefault();
  });
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  window.webContents.on('did-finish-load', () => {
    try {
      const url = new URL(window.webContents.getURL());
      if (url.protocol === 'https:' && url.origin === APP_ORIGIN)
        window.webContents.insertCSS(DESKTOP_CSS).catch(() => {});
    } catch {
      // 오프라인 안내 화면은 앱 전용 스타일을 사용한다.
    }
  });

  window.webContents.on('did-fail-load', (_event, errorCode, _description, target, isMainFrame) => {
    if (!isMainFrame || errorCode === -3) return; // -3: 정상적인 이동 중 이전 요청 취소
    if (!target.startsWith(APP_ORIGIN)) return;
    window.loadFile(OFFLINE_PATH).catch(() => {});
  });

  window.loadURL(APP_URL).catch(() => {
    // did-fail-load에서 오프라인 화면으로 이동한다.
  });
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
});

app.on('window-all-closed', () => app.quit());
