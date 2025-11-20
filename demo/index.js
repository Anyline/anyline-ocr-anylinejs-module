const rootElement = document.getElementById('root');
let anylineInstance = null;
let isMirrored = false;
let currentPreset = 'tin';

/**
 * Initialize and mount the Anyline Web SDK.
 * @param {HTMLSelectElement} selectElement
 */
async function mountAnylineWebSDK(selectElement) {
  try {
    closeSidebar();
    currentPreset = selectElement.value;

    const baseConfig = {
      cancelOnResult: false,
    };

    const advancedBarcodeConfig = {
      ...baseConfig,
      consecutiveEqualResultFilter: 0
    };

    const sdkConfig = currentPreset === 'all_barcode_formats' ? advancedBarcodeConfig : baseConfig;

    const tinFeedbackConfig = {
      dynamic: window.anylinejs.uiFeedbackPresets.tin,
      static: {
        instructionText: `Please make sure the entire ${currentPreset === 'tin' ? 'TIN' : 'DOT number'} is inside the cutout.`
      },
    }

    const uiFeedbackConfigs = {
      'tin': tinFeedbackConfig,
      'tin_dot': tinFeedbackConfig,
      'vin_with_user_guidance': {
        dynamic: window.anylinejs.uiFeedbackPresets.vin,
        static: {
          instructionText: "Please make sure the entire VIN is inside the cutout."
        }
      }
    }

    const parameters = {
        config: sdkConfig,
        hapticFeedback: true,
        preset: currentPreset,
        license: demoLicense,
        element: rootElement,
        debugAnyline: false,
        anylinePath: '../anylinejs',
        viewConfig: {
            uiFeedback: uiFeedbackConfigs[currentPreset],
        },
    }

    if (currentPreset === 'vin_with_user_guidance') {
        // we do this separately because vinConfig shouldn't be defined
        // if another preset is selected, and it shouldn't be undefined if vin (without user guidance)
        // is selected
        parameters.config.vinConfig = { validateCheckDigit: true}
    }

    anylineInstance = window.anylinejs.init(parameters);

    anylineInstance.onResult = (result) => {
      console.log('Scan Result:', result);
      alert(JSON.stringify(result.result, null, 2));
    };

    await appendCameraSelector(anylineInstance);
    await anylineInstance.startScanning();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

/**
 * Add camera device selector to the sidebar.
 * @param {object} anylineInstance
 */
async function appendCameraSelector(anylineInstance) {
  if (document.getElementById('camera-switcher')) return;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  stream.getTracks().forEach(track => track.stop());

  const videoInputs = (await navigator.mediaDevices.enumerateDevices())
    .filter(device => device.kind === 'videoinput');

  renderSelect({
    options: [{ text: 'Switch Camera', value: '' }, ...videoInputs.map(device => ({
      text: device.label || 'Unnamed Camera',
      value: device.deviceId,
    }))],
    onSelect: (deviceId) => {
      if (deviceId) {
        anylineInstance.camera.setCamera(deviceId);
      }
    }
  });
}

/**
 * Stop scanning and reset SDK.
 */
function stopWebSDK() {
  if (anylineInstance) {
    anylineInstance.stopScanning();
  }
}

/**
 * Pause scanning (camera stays on).
 */
function pauseWebSDK() {
  if (anylineInstance) {
    anylineInstance.pauseScanning();
  }
}

/**
 * Resume paused scanning.
 */
function resumeWebSDK() {
  if (anylineInstance) {
    anylineInstance.resumeScanning();
  }
}

/**
 * Refocus the camera.
 */
async function refocus() {
  if (!anylineInstance) return;
  try {
    await anylineInstance.camera.refocus();
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Turn on camera flash.
 */
async function enableFlash() {
  if (!anylineInstance) return;
  try {
    await anylineInstance.camera.activateFlash(true);
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Turn off camera flash.
 */
async function disableFlash() {
  if (!anylineInstance) return;
  try {
    await anylineInstance.camera.activateFlash(false);
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Toggle camera mirroring.
 */
function mirrorCamera() {
  if (!anylineInstance) return;
  isMirrored = !isMirrored;
  anylineInstance.camera.mirrorStream(isMirrored);
}

/**
 * Reattach camera to the DOM.
 */
function reappendCamera() {
  if (anylineInstance) {
    anylineInstance.camera.reappend();
  }
}

/**
 * Create and render a select dropdown.
 * @param {Object} params
 * @param {Array} params.options - List of {text, value}
 * @param {Function} params.onSelect - Callback on option select
 */
function renderSelect({ options, onSelect }) {
  const sidebar = document.getElementById('sidebar');
  const select = document.createElement('select');
  select.id = 'camera-switcher';
  select.className = 'preset-select';

  options.forEach(opt => {
    const optionElement = document.createElement('option');
    optionElement.text = opt.text;
    optionElement.value = opt.value;
    select.appendChild(optionElement);
  });

  select.addEventListener('change', (e) => onSelect(e.target.value));
  sidebar.appendChild(select);
}

/**
 * Sidebar Controls
 */
function openSidebar() {
  document.getElementById('sidebar').style.marginLeft = '0';
}

function closeSidebar() {
  document.getElementById('sidebar').style.marginLeft = '-250px';
}

/**
 * Remount Web SDK (e.g. after configuration change)
 */
function remountWebSDK() {
  if (currentPreset) {
    const fakeSelect = { value: currentPreset };
    mountAnylineWebSDK(fakeSelect);
  }
}
