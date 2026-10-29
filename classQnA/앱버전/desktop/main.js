'use strict';

const { app, BrowserWindow, Menu, session } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { serverUrl } = require('./config.json');

const APP_URL = new URL(serverUrl);
if (APP_URL.protocol !== 'https:')
  throw new Error('서버 주소는 HTTPS여야 합니다.');
const APP_ORIGIN = APP_URL.origin;
const OFFLINE_PATH = path.join(__dirname, 'offline.html');
const OFFLINE_URL = pathToFileURL(OFFLINE_PATH).href;

// Separate cookie stores make it possible to demonstrate several accounts on one PC.
// Ordinary launches keep using the original default profile.
const requestedProfile = process.argv.find(arg => arg.startsWith('--profile='))?.slice('--profile='.length);
const profile = ['teacher', 'student1', 'student2'].includes(requestedProfile)
  ? requestedProfile : 'default';
if (profile !== 'default') {
  const profilePath = path.join(app.getPath('userData'), 'profiles', profile);
  fs.mkdirSync(profilePath, { recursive: true });
  app.setPath('userData', profilePath);
}
const partition = profile === 'default'
  ? 'persist:classqna'
  : `persist:classqna-${profile}`;

function allowedNavigation(target) {
  if (target === OFFLINE_URL) return true;
  try {
    return new URL(target).origin === APP_ORIGIN;
  } catch {
    return false;
  }
}

function createWindow() {
  const appSession = session.fromPartition(partition);
  appSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  appSession.setPermissionCheckHandler(() => false);

  const window = new BrowserWindow({
    title: '수업 질문 대화',
    width: 980,
    height: 720,
    minWidth: 780,
    minHeight: 580,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      partition,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      webviewTag: false
    }
  });

  window.webContents.on('will-frame-navigate', (navigation) => {
    if (!allowedNavigation(navigation.url)) navigation.preventDefault();
  });
  window.webContents.on('will-navigate', (navigation) => {
    if (!allowedNavigation(navigation.url)) navigation.preventDefault();
  });
  window.webContents.on('will-redirect', (navigation) => {
    if (!allowedNavigation(navigation.url)) navigation.preventDefault();
  });
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('did-fail-load', (_event, errorCode, _description, target, isMainFrame) => {
    if (!isMainFrame || errorCode === -3 || !target.startsWith(APP_ORIGIN)) return;
    window.loadFile(OFFLINE_PATH).catch(() => {});
  });

  window.loadURL(APP_URL.href).catch(() => {});
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
});

app.on('window-all-closed', () => app.quit());
