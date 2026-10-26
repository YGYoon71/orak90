const romInput = document.getElementById('rom-file');
const game = document.getElementById('game');
const stage = document.getElementById('game-stage');
const welcome = document.getElementById('stage-welcome');
const loader = document.getElementById('stage-loader');
const statusLabel = document.getElementById('status-label');
const fileName = document.getElementById('file-name');
const fullscreenButton = document.getElementById('fullscreen-button');
let currentRomUrl = null;
let loadTimer = null;

romInput.addEventListener('change', () => {
  const file = romInput.files?.[0];
  if (!file) return;

  if (currentRomUrl) URL.revokeObjectURL(currentRomUrl);
  currentRomUrl = URL.createObjectURL(file);
  fileName.textContent = file.name;
  statusLabel.textContent = 'LOADING';
  welcome.hidden = true;
  loader.hidden = false;

  // Rebuild the mount point so a second game can be loaded without reloading the page.
  game.replaceChildren();
  document.querySelectorAll('script[data-emulatorjs]').forEach((script) => script.remove());
  for (const key of ['EJS_player', 'EJS_core', 'EJS_gameUrl', 'EJS_pathtodata', 'EJS_gameName', 'EJS_startOnLoaded', 'EJS_ready', 'EJS_onGameStart']) {
    try { delete window[key]; } catch { window[key] = undefined; }
  }

  window.EJS_player = '#game';
  window.EJS_core = 'mame';
  window.EJS_gameUrl = currentRomUrl;
  window.EJS_gameName = file.name.replace(/\.[^.]+$/, '');
  window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
  window.EJS_startOnLoaded = true;
  window.EJS_ready = () => {
    clearTimeout(loadTimer);
    statusLabel.textContent = 'READY';
    loader.hidden = true;
  };
  window.EJS_onGameStart = () => { statusLabel.textContent = 'PLAYING'; };

  clearTimeout(loadTimer);
  loadTimer = setTimeout(() => {
    if (loader.hidden) return;
    loader.innerHTML = '<div class="loader-pixel"></div><span>초기 로딩이 오래 걸리고 있어요. ROM 호환 버전과 네트워크 연결을 확인해 주세요.</span>';
  }, 25000);

  const script = document.createElement('script');
  script.src = `${window.EJS_pathtodata}loader.js`;
  script.dataset.emulatorjs = 'true';
  script.onerror = () => {
    clearTimeout(loadTimer);
    statusLabel.textContent = 'ERROR';
    loader.innerHTML = '<span>에뮬레이터를 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 다시 선택해 주세요.</span>';
    loader.hidden = false;
  };
  document.body.append(script);
});

fullscreenButton.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await stage.requestFullscreen();
  } catch {
    statusLabel.textContent = 'FULLSCREEN ERROR';
  }
});

window.addEventListener('beforeunload', () => {
  if (currentRomUrl) URL.revokeObjectURL(currentRomUrl);
});
