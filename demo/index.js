/**
 * Anyline Web SDK Demo
 *
 * This demo showcases recommended patterns for integrating the Anyline Web SDK.
 *
 * @see https://documentation.anyline.com/web-sdk-component/latest/
 */

const rootElement = document.getElementById('root');

/**
 * SDK State enum mirrors the internal SDK states.
 * Tracking state prevents calling methods at inappropriate times
 * (e.g., resumeScanning when already scanning).
 */
const SDK_STATES = {
  UNINITIALIZED: 'uninitialized',
  INITIALIZED: 'initialized',
  SCANNING: 'scanning',
  PAUSED: 'paused',
  STOPPED: 'stopped',
  DISPOSED: 'disposed',
};

let anylineInstance = null;
let isMirrored = false;
let isFlashOn = false;
let currentPreset = 'tin';
let currentState = SDK_STATES.UNINITIALIZED;

// Feature support flags (detected at runtime)
let supportsRefocus = false;
let supportsFlash = false;

/**
 * UI Feedback configurations provide real-time guidance to users during scanning.
 *
 */
function getUiFeedbackConfig(preset) {
  const tinFeedbackConfig = {
    dynamic: globalThis.anylinejs.uiFeedbackPresets.tin,
    static: {
      instructionText: `Please make sure the entire ${preset === 'tin' ? 'TIN' : 'DOT number'} is inside the cutout.`,
    },
  };

  const configs = {
    tin: tinFeedbackConfig,
    tin_dot: tinFeedbackConfig,
    vin_with_user_guidance: {
      dynamic: globalThis.anylinejs.uiFeedbackPresets.vin,
      static: {
        instructionText:
          'Please make sure the entire VIN is inside the cutout.',
      },
    },
  };

  return configs[preset];
}

/**
 * Centralized error handler with specific handling for SDK exception types.
 *
 * @param {Error} error - The error to handle
 * @returns {Object} - Object with title and message for display
 */
function handleError(error) {
  console.error('[Anyline Demo]', error);

  // Check for SDK-specific exception types
  // These are exported from the SDK and available on window.anylinejs

  const sdkErrors = globalThis.anylinejs || {};
  const {
    AnylineError,
    CameraStreamError,
    DisposedError,
    OnlyAndroidChromeError,
    LicenseParseError,
    MediaDevicesError,
    PresetNotFoundError,
  } = sdkErrors;

  if (LicenseParseError && error instanceof LicenseParseError) {
    return {
      title: 'License Error',
      message:
        'The license key is invalid or malformed. Please check your license configuration.',
    };
  }

  if (CameraStreamError && error instanceof CameraStreamError) {
    return {
      title: 'Camera Error',
      message:
        'Could not access the camera. Please ensure:\n' +
        '1. Camera permissions are granted\n' +
        '2. No other application is using the camera\n' +
        '3. You are using HTTPS (required for camera access)',
    };
  }

  if (OnlyAndroidChromeError && error instanceof OnlyAndroidChromeError) {
    return {
      title: 'Feature Not Supported',
      message:
        'This feature is not supported on your current browser or device.\n' +
        'Some features like flash and refocus require Chrome on Android or Safari 18.4+.',
    };
  }

  if (DisposedError && error instanceof DisposedError) {
    return {
      title: 'Instance Disposed',
      message:
        'The SDK instance has been disposed. Please reinitialize by selecting a use case.',
    };
  }

  if (MediaDevicesError && error instanceof MediaDevicesError) {
    return {
      title: 'Secure Context Required',
      message:
        'Camera access requires HTTPS. Please ensure you are accessing this page over a secure connection.',
    };
  }

  if (PresetNotFoundError && error instanceof PresetNotFoundError) {
    return {
      title: 'Invalid Preset',
      message: error.message,
    };
  }

  // Handle browser-native DOMExceptions
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError') {
      return {
        title: 'Permission Denied',
        message:
          'Camera permission was denied. Please allow camera access in your browser settings and reload the page.',
      };
    }
    if (error.name === 'NotFoundError') {
      return {
        title: 'No Camera Found',
        message:
          'No camera device was found. Please connect a camera and try again.',
      };
    }
    if (error.name === 'NotReadableError') {
      return {
        title: 'Camera In Use',
        message:
          'The camera is already in use by another application. Please close other apps using the camera.',
      };
    }
  }

  if (AnylineError && error instanceof AnylineError) {
    return {
      title: 'SDK Error',
      message: error.message || 'An SDK error occurred.',
    };
  }

  // Generic fallback with error code if available
  const errorCode = error.message?.match(/Error (\d+):/)?.[1];
  return {
    title: 'Error' + (errorCode ? ` (${errorCode})` : ''),
    message: error.message || 'An unexpected error occurred.',
  };
}

/**
 * Returns the SDK state if available, otherwise the tracked state.
 *
 * @returns {string}
 */
function getEffectiveState() {
  if (anylineInstance && typeof anylineInstance.getState === 'function') {
    try {
      return anylineInstance.getState();
    } catch {
      return currentState;
    }
  }
  return currentState;
}

/**
 * Updates the current SDK state and synchronizes UI.
 *
 * @param {string} newState - One of SDK_STATES values
 */
function updateState(newState) {
  currentState = newState;
  updateStateUI();
  updateButtonStates();
}

/**
 * Updates the state indicator in the sidebar.
 */
function updateStateUI() {
  const indicator = document.getElementById('state-indicator');
  if (!indicator) return;

  const effectiveState = getEffectiveState();

  const stateDisplay = {
    [SDK_STATES.UNINITIALIZED]: { text: 'Not Started', class: 'state-idle' },
    [SDK_STATES.INITIALIZED]: { text: 'Initialized', class: 'state-ready' },
    [SDK_STATES.SCANNING]: { text: 'Scanning...', class: 'state-active' },
    [SDK_STATES.PAUSED]: { text: 'Paused', class: 'state-paused' },
    [SDK_STATES.STOPPED]: { text: 'Stopped', class: 'state-idle' },
    [SDK_STATES.DISPOSED]: { text: 'Disposed', class: 'state-idle' },
  };

  const display =
    stateDisplay[effectiveState] || stateDisplay[SDK_STATES.UNINITIALIZED];
  indicator.textContent = display.text;
  indicator.className = `state-indicator ${display.class}`;
}

/**
 * Enables/disables buttons based on current state.
 *
 */
function updateButtonStates() {
  const isInitialized = anylineInstance !== null;
  const effectiveState = getEffectiveState();
  const isScanning = effectiveState === SDK_STATES.SCANNING;
  const isPaused = effectiveState === SDK_STATES.PAUSED;
  const isStopped = effectiveState === SDK_STATES.STOPPED;

  // Control buttons
  // Note: SDK allows resumeScanning() from both PAUSED and STOPPED states
  setButtonEnabled('btn-stop', isScanning || isPaused);
  setButtonEnabled('btn-pause', isScanning);
  setButtonEnabled('btn-resume', isPaused || isStopped);
  setButtonEnabled('btn-remount', isInitialized);

  // Update Resume/Start button text based on state
  const resumeBtn = document.getElementById('btn-resume');
  if (resumeBtn) {
    resumeBtn.textContent = isStopped ? 'Start' : 'Resume';
    resumeBtn.setAttribute(
      'aria-label',
      isStopped ? 'Start scanning' : 'Resume scanning',
    );
  }

  // Camera control buttons - also check feature support
  setButtonEnabled('btn-refocus', isScanning && supportsRefocus);
  setButtonEnabled('btn-flash-on', isScanning && supportsFlash && !isFlashOn);
  setButtonEnabled('btn-flash-off', isScanning && supportsFlash && isFlashOn);
  setButtonEnabled('btn-mirror', isScanning || isPaused);
  setButtonEnabled('btn-reappend', isScanning || isPaused);

  // Update flash button visibility based on current state
  updateFlashButtonVisibility();
}

/**
 * Helper to enable/disable a button by ID.
 */
function setButtonEnabled(id, enabled) {
  const btn = document.getElementById(id);
  if (btn) {
    btn.disabled = !enabled;
    btn.classList.toggle('btn-disabled', !enabled);
  }
}

/**
 * Updates flash button visibility to show only the relevant action.
 */
function updateFlashButtonVisibility() {
  const flashOnBtn = document.getElementById('btn-flash-on');
  const flashOffBtn = document.getElementById('btn-flash-off');
  if (flashOnBtn && flashOffBtn) {
    flashOnBtn.style.display = isFlashOn ? 'none' : 'flex';
    flashOffBtn.style.display = isFlashOn ? 'flex' : 'none';
  }
}

/**
 * Detects platform capabilities for flash and refocus features.
 *
 */
function detectFeatureSupport() {
  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const isChrome = /Chrome/i.test(ua) && !/Edge|Edg/i.test(ua);
  const isSafari = /Safari/i.test(ua) && !/Chrome/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/.test(ua);

  // Refocus is only available on Chrome Android
  supportsRefocus = isAndroid && isChrome;

  // Flash is available on Chrome Android and Safari 18.4+
  // For Safari, we check for iOS 18.4+ support
  if (isAndroid && isChrome) {
    supportsFlash = true;
  } else if (isIOS && isSafari) {
    // Safari 18.4+ on iOS supports torch
    const safariMatch = ua.match(/Version\/(\d+)\.(\d+)/);
    if (safariMatch) {
      const major = Number.parseInt(safariMatch[1], 10);
      const minor = Number.parseInt(safariMatch[2], 10);
      supportsFlash = major > 18 || (major === 18 && minor >= 4);
    }
  }

  // Update UI to reflect feature availability
  updateFeatureSupportUI();
}

/**
 * Detects if the SDK would auto-mirror the camera stream.
 * The SDK mirrors by default on desktop (mirrorOnDesktop = true) or on mobile with user-facing camera.
 * Since we can't know the facingMode before camera starts, we detect desktop here.
 *
 * @returns {boolean} - True if SDK would auto-mirror
 */
function detectInitialMirrorState() {
  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isMobile = isAndroid || isIOS;

  // SDK auto-mirrors on desktop by default (mirrorOnDesktop = true)
  return !isMobile;
}

/**
 * Updates UI elements to show feature availability.
 */
function updateFeatureSupportUI() {
  const refocusBtn = document.getElementById('btn-refocus');
  const flashOnBtn = document.getElementById('btn-flash-on');
  const flashOffBtn = document.getElementById('btn-flash-off');

  if (refocusBtn && !supportsRefocus) {
    refocusBtn.title = 'Refocus requires Chrome on Android';
  }

  if (flashOnBtn && !supportsFlash) {
    flashOnBtn.title = 'Flash requires Chrome on Android or Safari 18.4+';
  }
  if (flashOffBtn && !supportsFlash) {
    flashOffBtn.title = 'Flash requires Chrome on Android or Safari 18.4+';
  }
}

/**
 * PRELOAD PATTERN (Advanced Usage)
 *
 * For applications that need faster startup times, you can preload WASM modules
 * before starting the camera. This is useful for:
 * - Applications with loading screens
 * - Multi-step workflows where scanning is a later step
 * - Reducing perceived latency when the user initiates a scan
 *
 * Example implementation:
 *
 * ```javascript
 * // 1. Initialize with preload: true
 * const instance = window.anylinejs.init({
 *   preload: true,           // Enable preload mode
 *   preset: 'vin',
 *   license: yourLicense,
 *   element: rootElement,
 *   anylinePath: '../anylinejs',
 * });
 *
 * // 2. Call preload() - WASM downloads without starting camera
 * await instance.preload();
 * // At this point, WASM is loaded but camera hasn't started
 *
 * // 3. When ready to scan, start normally
 * await instance.startScanning();
 * // Camera starts immediately since WASM is already loaded
 * ```
 *
 * CACHING BEHAVIOR:
 * By default, the SDK caches WASM modules in the browser's IndexedDB.
 * This means subsequent loads are nearly instant. You can disable this with:
 *
 * ```javascript
 * const instance = window.anylinejs.init({
 *   enableCaching: false,    // Disable WASM caching (not recommended)
 *   // ... other options
 * });
 * ```
 *
 * For the preload example implementation, see: demo/preload-example.js
 */

/**
 * Initialize and mount the Anyline Web SDK.
 *
 * @param {HTMLSelectElement|{value: string}} selectElement - Element containing preset value
 */
async function mountAnylineWebSDK(selectElement) {
  // Validate selection
  if (!selectElement.value) {
    return;
  }

  showLoadingState('Initializing SDK...');

  try {
    // Clean up existing instance before remounting
    // WHY: Proper cleanup prevents memory leaks and ensures clean state
    if (anylineInstance) {
      await cleanupInstance();
    }

    closeSidebar();
    currentPreset = selectElement.value;

    // Build configuration
    const config = buildSdkConfig(currentPreset);
    const parameters = {
      config,
      hapticFeedback: true,
      preset: currentPreset,
      license: demoLicense,
      element: rootElement,
      debugAnyline: false,
      anylinePath: '../anylinejs',
      viewConfig: {
        uiFeedback: getUiFeedbackConfig(currentPreset),
      },
    };

    // VIN-specific configuration for check digit validation
    if (currentPreset === 'vin_with_user_guidance') {
      parameters.config.vinConfig = { validateCheckDigit: true };
    }

    // Initialize SDK
    anylineInstance = globalThis.anylinejs.init(parameters);
    updateState(SDK_STATES.INITIALIZED);

    // Set up result handler
    anylineInstance.onResult = (result) => {
      console.log('Scan Result:', result);
      displayResult(result.result);
    };

    // Set up camera selector
    await appendCameraSelector(anylineInstance);

    // Start scanning
    showLoadingState('Starting camera...');
    await anylineInstance.startScanning();
    updateState(SDK_STATES.SCANNING);

    // Sync UI state with SDK's auto-detection
    // The SDK auto-mirrors on desktop (mirrorOnDesktop = true by default)
    isFlashOn = false;
    isMirrored = detectInitialMirrorState();

    hideLoadingState();
  } catch (error) {
    hideLoadingState();
    const { title, message } = handleError(error);
    displayError(message, title);
    updateState(SDK_STATES.UNINITIALIZED);
  }
}

/**
 * Builds SDK configuration based on preset.
 */
function buildSdkConfig(preset) {
  const baseConfig = {
    cancelOnResult: false,
  };

  // Barcode scanning benefits from disabling the consecutive result filter
  // to capture each scan even if the same code is scanned repeatedly
  if (preset === 'all_barcode_formats') {
    return {
      ...baseConfig,
      consecutiveEqualResultFilter: 0,
    };
  }

  return baseConfig;
}

/**
 * Clean up existing SDK instance.
 *
 */
async function cleanupInstance() {
  if (!anylineInstance) return;

  try {
    const effectiveState = getEffectiveState();
    if (
      effectiveState === SDK_STATES.SCANNING ||
      effectiveState === SDK_STATES.PAUSED
    ) {
      anylineInstance.stopScanning();
    }
    anylineInstance.dispose();
  } catch (error) {
    // Ignore cleanup errors - instance may already be disposed
    console.warn('[Anyline Demo] Cleanup warning:', error.message);
  }

  anylineInstance = null;
  updateState(SDK_STATES.DISPOSED);
}

/**
 * Stop scanning and reset SDK.
 */
function stopWebSDK() {
  closeSidebar();
  if (!anylineInstance) return;

  const effectiveState = getEffectiveState();
  if (
    effectiveState !== SDK_STATES.SCANNING &&
    effectiveState !== SDK_STATES.PAUSED
  ) {
    console.warn('[Anyline Demo] Cannot stop - not currently scanning');
    return;
  }

  try {
    anylineInstance.stopScanning();
    updateState(SDK_STATES.STOPPED);
  } catch (error) {
    const { title, message } = handleError(error);
    displayError(message, title);
  }
}

/**
 * Pause scanning (camera stays on).
 *
 */
function pauseWebSDK() {
  closeSidebar();
  if (!anylineInstance) return;

  const effectiveState = getEffectiveState();
  if (effectiveState !== SDK_STATES.SCANNING) {
    console.warn('[Anyline Demo] Cannot pause - not currently scanning');
    return;
  }

  try {
    anylineInstance.pauseScanning();
    updateState(SDK_STATES.PAUSED);
  } catch (error) {
    const { title, message } = handleError(error);
    displayError(message, title);
  }
}

/**
 * Resume paused or stopped scanning.
 * Note: SDK allows resumeScanning() from both PAUSED and STOPPED states.
 */
async function resumeWebSDK() {
  closeSidebar();
  if (!anylineInstance) return;

  const effectiveState = getEffectiveState();
  if (
    effectiveState !== SDK_STATES.PAUSED &&
    effectiveState !== SDK_STATES.STOPPED
  ) {
    console.warn(
      '[Anyline Demo] Cannot resume - not currently paused or stopped',
    );
    return;
  }

  try {
    await anylineInstance.resumeScanning();
    updateState(SDK_STATES.SCANNING);
  } catch (error) {
    const { title, message } = handleError(error);
    displayError(message, title);
  }
}

/**
 * Remount Web SDK (e.g., after configuration change).
 */
function remountWebSDK() {
  closeSidebar();
  if (currentPreset) {
    const fakeSelect = { value: currentPreset };
    mountAnylineWebSDK(fakeSelect);
  }
}

/**
 * Refocus the camera.
 *
 * NOTE: This feature is only available on Chrome for Android.
 */
async function refocus() {
  closeSidebar();
  if (!anylineInstance) return;

  if (!supportsRefocus) {
    displayError(
      'Refocus is only available on Chrome for Android.',
      'Feature Not Supported',
    );
    return;
  }

  try {
    await anylineInstance.camera.refocus();
  } catch (error) {
    const { title, message } = handleError(error);
    displayError(message, title);
  }
}

/**
 * Turn on camera flash.
 *
 * NOTE: Flash is only available on Chrome Android and Safari 18.4+.
 */
async function enableFlash() {
  closeSidebar();
  if (!anylineInstance) return;

  if (!supportsFlash) {
    displayError(
      'Flash is only available on Chrome for Android or Safari 18.4+.',
      'Feature Not Supported',
    );
    return;
  }

  try {
    await anylineInstance.camera.activateFlash(true);
    isFlashOn = true;
    updateButtonStates();
  } catch (error) {
    // Revert state on failure
    isFlashOn = false;
    updateButtonStates();
    const { title, message } = handleError(error);
    displayError(message, title);
  }
}

/**
 * Turn off camera flash.
 */
async function disableFlash() {
  closeSidebar();
  if (!anylineInstance) return;

  try {
    await anylineInstance.camera.activateFlash(false);
    isFlashOn = false;
    updateButtonStates();
  } catch (error) {
    const { title, message } = handleError(error);
    displayError(message, title);
  }
}

/**
 * Toggle camera mirroring.
 *
 */
function mirrorCamera() {
  if (!anylineInstance) {
    closeSidebar();
    return;
  }

  try {
    isMirrored = !isMirrored;
    anylineInstance.camera.mirrorStream(isMirrored);
    closeSidebar();
  } catch (error) {
    // Revert state on failure
    isMirrored = !isMirrored;
    closeSidebar();
    const { title, message } = handleError(error);
    displayError(message, title);
  }
}

/**
 * Reattach camera to the DOM.
 *
 */
function reappendCamera() {
  closeSidebar();
  if (!anylineInstance) return;

  try {
    anylineInstance.camera.reappend();
  } catch (error) {
    const { title, message } = handleError(error);
    displayError(message, title);
  }
}

/**
 * Add camera device selector to the sidebar.
 *
 * @param {object} anylineInstance
 */
async function appendCameraSelector(anylineInstance) {
  if (document.getElementById('camera-switcher')) return;

  try {
    // Request camera permission to get labeled device names
    // WHY: enumerateDevices only returns device labels after permission is granted
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    // Immediately stop the temporary stream - SDK manages its own stream
    stream.getTracks().forEach((track) => track.stop());

    const videoInputs = (
      await navigator.mediaDevices.enumerateDevices()
    ).filter((device) => device.kind === 'videoinput');

    // Only show selector if multiple cameras available
    if (videoInputs.length <= 1) return;

    renderSelect({
      options: [
        { text: 'Switch Camera', value: '' },
        ...videoInputs.map((device, index) => ({
          text: device.label || `Camera ${index + 1}`,
          value: device.deviceId,
        })),
      ],
      onSelect: async (deviceId) => {
        if (!deviceId) return;

        try {
          anylineInstance.camera.setCamera(deviceId);
          closeSidebar();
        } catch (error) {
          closeSidebar();
          const { title, message } = handleError(error);
          displayError(message, title);
        }
      },
    });
  } catch (error) {
    // Camera enumeration failed - likely permission denied
    console.warn('[Anyline Demo] Could not enumerate cameras:', error.message);
  }
}

/**
 * Create and render a select dropdown.
 *
 * @param {Object} params
 * @param {Array} params.options - List of {text, value}
 * @param {Function} params.onSelect - Callback on option select
 */
function renderSelect({ options, onSelect }) {
  const sidebar = document.getElementById('sidebar');
  const select = document.createElement('select');
  select.id = 'camera-switcher';
  select.className = 'preset-select';
  select.setAttribute('aria-label', 'Select camera');

  options.forEach((opt) => {
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
  const sidebar = document.getElementById('sidebar');
  sidebar.style.marginLeft = '0';
  sidebar.setAttribute('aria-hidden', 'false');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.marginLeft = `-${sidebar.offsetWidth}px`;
  sidebar.setAttribute('aria-hidden', 'true');
}

/**
 * Show loading state with message.
 */
function showLoadingState(message) {
  const loadingEl = document.getElementById('loading-indicator');
  if (loadingEl) {
    loadingEl.textContent = message;
    loadingEl.classList.add('show');
  }
}

/**
 * Hide loading state.
 */
function hideLoadingState() {
  const loadingEl = document.getElementById('loading-indicator');
  if (loadingEl) {
    loadingEl.classList.remove('show');
  }
}

/**
 * Display scan result in a modal dialog.
 *
 * @param {object} result - The scan result object
 */
function displayResult(result) {
  const modal = document.getElementById('result-modal');
  const resultText = document.getElementById('result-modal-text');
  const heading = modal.querySelector('h2');

  heading.textContent = 'Scan Result';
  heading.style.color = '#333';
  resultText.textContent = JSON.stringify(result, null, 2);

  // Use native dialog API
  if (!modal.open) {
    modal.showModal();
  }

  // Pause scanning when showing result
  // WHY: Pausing (not stopping) allows quick resume after viewing result
  if (anylineInstance && getEffectiveState() === SDK_STATES.SCANNING) {
    anylineInstance.pauseScanning();
    updateState(SDK_STATES.PAUSED);
  }
}

/**
 * Display error message in a modal dialog.
 *
 * @param {string} errorMessage - The error message to display
 * @param {string} [title='Error'] - The error title
 */
function displayError(errorMessage, title = 'Error') {
  const modal = document.getElementById('result-modal');
  const resultText = document.getElementById('result-modal-text');
  const heading = modal.querySelector('h2');

  heading.textContent = title;
  heading.style.color = '#d32f2f';
  resultText.textContent = errorMessage;

  // Use native dialog API
  if (!modal.open) {
    modal.showModal();
  }
}

/**
 * Close the result modal.
 */
async function closeResultModal() {
  const modal = document.getElementById('result-modal');

  // Use native dialog API
  if (modal.open) {
    modal.close();
  }

  // Resume scanning when closing modal (if we were paused)
  if (anylineInstance && getEffectiveState() === SDK_STATES.PAUSED) {
    try {
      await anylineInstance.resumeScanning();
      updateState(SDK_STATES.SCANNING);
    } catch (error) {
      console.warn('[Anyline Demo] Could not resume:', error.message);
    }
  }
}

/**
 * Handle page visibility changes.
 *
 */
function handleVisibilityChange() {
  if (document.visibilityState === 'visible' && anylineInstance) {
    // Small delay to let browser fully restore
    setTimeout(() => {
      const effectiveState = getEffectiveState();
      if (
        effectiveState === SDK_STATES.SCANNING ||
        effectiveState === SDK_STATES.PAUSED
      ) {
        try {
          anylineInstance.camera.reappend();
        } catch (error) {
          console.warn(
            '[Anyline Demo] Reappend on visibility change failed:',
            error.message,
          );
        }
      }
    }, 100);
  }
}

/**
 * Handle page show event (for back/forward cache restoration).
 *
 */
function handlePageShow(event) {
  if (event.persisted && anylineInstance) {
    // Page was restored from bfcache
    try {
      anylineInstance.camera.reappend();
    } catch (error) {
      console.warn(
        '[Anyline Demo] Reappend on pageshow failed:',
        error.message,
      );
    }
  }
}

/**
 * Handle page unload for cleanup.
 *
 */
function handleBeforeUnload() {
  if (anylineInstance) {
    try {
      anylineInstance.dispose();
    } catch {
      // Intentionally ignored - page is unloading, logging would be pointless
      // and the error cannot be meaningfully handled at this stage
    }
    anylineInstance = null;
  }
}

/**
 * Initialize demo when DOM is ready.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Detect feature support
  detectFeatureSupport();

  // Initialize UI state
  updateState(SDK_STATES.UNINITIALIZED);

  // Set up page lifecycle handlers
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pageshow', handlePageShow);
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Set up modal event handlers
  const modal = document.getElementById('result-modal');
  if (modal) {
    // Native dialog handles ESC key automatically
    // Handle close event to resume scanning
    modal.addEventListener('close', async () => {
      // Resume scanning when modal is closed (if we were paused)
      if (anylineInstance && getEffectiveState() === SDK_STATES.PAUSED) {
        try {
          await anylineInstance.resumeScanning();
          updateState(SDK_STATES.SCANNING);
        } catch (error) {
          console.warn('[Anyline Demo] Could not resume:', error.message);
        }
      }
    });

    // Close on backdrop click (click outside dialog content)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  }

  // Start with sidebar open (visible by default on page load)
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.marginLeft = '0';
    sidebar.setAttribute('aria-hidden', 'false');
  }
});
