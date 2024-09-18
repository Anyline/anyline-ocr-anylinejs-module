const root = document.getElementById('root');
let anyline = null;
let mirrored = false;
let selectedPreset = 'barcode';

async function mountAnylineWebSDK(preset) {
  try {
    closeSidebar();
    selectedPreset = preset;

    anyline = window.anylinejs.init({
      config: {
        cancelOnResult: false,
      },
      hapticFeedback: true,
      preset: preset.value,
      license: demoLicense,
      element: root,
      debugAnyline: true,
      anylinePath: '../anylinejs',
    });

    anyline.onResult = (result) => {
      console.log('Result: ', result);
      alert(JSON.stringify(result.result, null, 2));
    };

    /**
     * Uncomment this to use the callback that
     * gets all scanned barcodes passed which
     * are visible within the cutout.
     */
    // anyline.onScannedBarcodes = (result) => {
    //   console.log(result);
    // };

    await appendCameraSelector(anyline);

    await anyline.startScanning().catch((e) => alert(e.message));
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
}

/**
 * Appends camera selector.
 */
async function appendCameraSelector(anyline) {
  if (document.getElementById('camera-switcher')) return;

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

/**
 * Remount the Anyline Web SDK.
 */
function remountWebSDK() {
  anyline.stopScanning();
  anyline.dispose();
  mountAnylineWebSDK(selectedPreset);
}

/**
 * Disable/Enable flash (for Chrome on Android).
 */
async function disableFlash() {
  if (!anyline) return;
  try {
    await anyline.camera.activateFlash(false);
  } catch (e) {
    alert(e.message);
  }
}
async function enableFlash() {
  if (!anyline) return;
  try {
    await anyline.camera.activateFlash(true);
  } catch (e) {
    alert(e.message);
  }
}

/**
 * Mirrors the camera.
 */
function mirrorCamera() {
  if (!anyline) return;
  const newState = !mirrored;
  anyline.camera.mirrorStream(newState);
  mirrored = newState;
}

/**
 * Reappends the camera.
 */
function reappendCamera() {
  if (!anyline) return;
  anyline.camera.reappend();
}

/**
 * Renders a drop-down for selecting the available cameras.
 */
function renderSelect({ options, onSelect }) {
  const parent = document.getElementById('sidebar');

  //Create and append select list
  const selectEl = document.createElement('select');
  selectEl.id = 'camera-switcher';
  selectEl.classList.add('preset-select');
  parent.appendChild(selectEl);

  options.forEach((option) => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.text = option.text;
    selectEl.appendChild(optionEl);
  });

  selectEl.onchange = (e) => onSelect(e.target.value);
}

/**
 * Refocus camera (for Chrome on Android).
 */
async function refocus() {
  if (!anyline) return;
  try {
    await anyline.camera.refocus();
  } catch (e) {
    alert(e.message);
  }
}

/**
 * Open/Close sidebar.
 */
function openSidebar() {
  document.getElementById('sidebar').style.marginLeft = '0';
}
function closeSidebar() {
  document.getElementById('sidebar').style.marginLeft = '-250px';
}
