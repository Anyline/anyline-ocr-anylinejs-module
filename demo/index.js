const root = document.getElementById('root');
let selectedPreset = undefined;
let anyline;
let mirrored = false;

async function mountAnylineJS(preset) {
  try {
    selectedPreset = preset;

    anyline = window.anylinejs.init({
      config: {},
      preset: preset.value,
      license: demoLicense,
      element: root,
      debugAnyline: true,
      anylinePath: '../anylinejs',
    });

    anyline.onResult = result => {
      console.log('Result: ', result);
      alert(JSON.stringify(result.result, null, 2));
    };

    await appendCameraSwitcher(anyline);

    await anyline.startScanning().catch(e => alert(e.message));
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
}

function mirrorCamera() {
  if (!anyline) return;
  const newState = !mirrored;
  anyline.camera.mirrorStream(newState);
  mirrored = newState;
}

async function appendCameraSwitcher(anyline) {
  if (document.getElementById('cameraSwitcher')) return;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {},
    audio: false,
  });

  stream.getTracks().forEach(track => {
    stream.removeTrack(track);
    track.stop();
  });

  const devices = (await navigator.mediaDevices.enumerateDevices()) || [];
  renderSelect({
    options: devices
      .filter(m => m.kind === 'videoinput')
      .map(camera => ({
        text: camera.label,
        value: camera.deviceId,
      }))
      .reduce((acc, camera) => [...acc, camera], [{ text: 'switch cam' }]),
    onSelect: deviceId => deviceId && anyline.camera.setCamera(deviceId),
  });
}

function renderSelect({ options, onSelect }) {
  var parent = document.getElementsByClassName('toolbar')[0];

  //Create and append select list
  const selectEl = document.createElement('select');
  selectEl.id = 'cameraSwitcher';
  parent.appendChild(selectEl);

  options.forEach(option => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.text = option.text;
    selectEl.appendChild(optionEl);
  });

  selectEl.onchange = e => onSelect(e.target.value);
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
