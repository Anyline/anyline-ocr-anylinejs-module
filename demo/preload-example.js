const root = document.getElementById('root');
let selectedPreset = undefined;
let anyline;
let mirrored = false;
const ANYLINE_PATH = '../anylinejs';

const DEFAULT_PRESET = {
  value: 'barcode',
};

async function preload(preset = DEFAULT_PRESET) {
  try {
    selectedPreset = preset;

    anyline = window.anylinejs.init({
      preload: true,
      config: {
        id: 'Any',
        cancelOnResult: true,
      },
      preset: preset.value,
      license: demoLicense,
      element: root,
      debugAnyline: true,
      enableCaching: false,
      anylinePath: ANYLINE_PATH,
    });

    anyline.onResult = (result) => {
      console.log('Result: ', result);
      alert(JSON.stringify(result.result, null, 2));
    };

    await appendCameraSwitcher(anyline);

    await anyline.preload();
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
}

async function startScanning() {
  await anyline.startScanning().catch((e) => alert(e.message));
}

function mirrorCamera() {
  if (!anyline) return;
  const newState = !mirrored;
  anyline.camera.mirrorStream(newState);
  mirrored = newState;
}

function reappendCamera() {
  if (!anyline) return;
  anyline.camera.reappend();
}

async function appendCameraSwitcher(anyline) {
  if (document.getElementById('cameraSwitcher')) return;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {},
    audio: false,
  });

  stream.getTracks().forEach((track) => {
    stream.removeTrack(track);
    track.stop();
  });

  const devices = (await navigator.mediaDevices.enumerateDevices()) || [];
  renderSelect({
    options: devices
      .filter((m) => m.kind === 'videoinput')
      .map((camera) => ({
        text: camera.label,
        value: camera.deviceId,
      }))
      .reduce((acc, camera) => [...acc, camera], [{ text: 'switch cam' }]),
    onSelect: (deviceId) => deviceId && anyline.camera.setCamera(deviceId),
  });
}

function renderSelect({ options, onSelect }) {
  let parent = document.getElementsByClassName('toolbar')[0];

  //Create and append select list
  const selectEl = document.createElement('select');
  selectEl.id = 'cameraSwitcher';
  parent.appendChild(selectEl);

  options.forEach((option) => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.text = option.text;
    selectEl.appendChild(optionEl);
  });

  selectEl.onchange = (e) => onSelect(e.target.value);
}

function remountAnylineJS() {
  anyline.stopScanning();
  anyline.dispose();
  mountAnylineJS(selectedPreset);
}

async function enableFlash() {
  if (!anyline) return;
  try {
    await anyline.camera.activateFlash(true);
  } catch (e) {
    alert(e.message);
  }
}

async function disableFlash() {
  if (!anyline) return;
  try {
    await anyline.camera.activateFlash(false);
  } catch (e) {
    alert(e.message);
  }
}

async function refocus() {
  if (!anyline) return;
  try {
    await anyline.camera.refocus();
  } catch (e) {
    alert(e.message);
  }
}

preload();
