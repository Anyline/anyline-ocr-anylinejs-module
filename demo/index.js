const root = document.getElementById('root');
let selectedPreset = undefined;
let anyline;

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

    await anyline.startScanning().catch(e => alert(e.message));

    appendCameraSwitcher(anyline);
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
}

function appendCameraSwitcher(anyline) {
  if (document.getElementById('cameraSwitcher')) return;

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(() => {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        renderSelect({
          options: devices
            .filter(m => m.kind === 'videoinput')
            .map(camera => ({
              text: camera.label,
              value: camera.deviceId,
            })),
          onSelect: deviceId => anyline.setCamera(deviceId),
        });
      });
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
  try {
    await anyline.activateFlash(true);
  } catch (e) {
    alert(e.message);
  }
}

async function disableFlash() {
  try {
    await anyline.activateFlash(false);
  } catch (e) {
    alert(e.message);
  }
}

async function refocus() {
  try {
    await anyline.refocus();
  } catch (e) {
    alert(e.message);
  }
}
