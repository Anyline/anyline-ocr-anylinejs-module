const { init, errorCodes } = window.anylinejs;

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function(s) {
    return entityMap[s];
  });
}

function replaceVerticalBar(string) {
  return String(string).replace(/[|]/g, function(s) {
    return '\n';
  });
}

const viewConfig = {
  // captureResolution: '1080p',
  outerColor: '000000',
  outerAlpha: 0.5,
  cutouts: [
    {
      cutoutConfig: {
        // style: 'rect',
        maxWidthPercent: '80%',
        alignment: 'top_half',
        ratioFromSize: {
          width: 300,
          height: 250,
        },
        width: 720,
        strokeWidth: 2,
        cornerRadius: 4,
        strokeColor: 'FFFFFFFF',
        feedbackStrokeColor: '0099FF',
      },
      // flash: {
      //   mode: 'manual',
      //   alignment: 'top_left',
      // },
      // cancelOnResult: false,
      // "delayStartScanTime": 2000,
      scanFeedback: {
        style: 'contour_point',
        strokeColor: '0099FF',
        fillColor: '300099FF',
        strokeWidth: 2,
        cornerRadius: 4,
        animationDuration: 150,
        animation: 'NONE',
        // beepOnResult: true,
        // vibrateOnResult: true,
        // blinkAnimationOnResult: true,
      },
    },
  ],
};


const root = document.getElementById('root');
let selectedPreset = undefined;

function mountAnylineJS(preset) {
  selectedPreset = preset;
  const Anyline = init({
    config: {},
    preset: preset.value,
    viewConfig,
    license: demoLicense,
    element: root,
    debugAnyline: true,
    anylinePath: '../../anylinejs'
  });

  let modalOpen = false;

  Anyline.onResult = result => {
    console.log('Result: ', result);
    if (modalOpen) return;
    // Anyline.stopScanning();
    window.Swal.fire({
      title: 'Result',
      html: `<div class="result">${result.result
        .map(
          resultEl =>
            `
        <div class="resultRow">
          <div class="resultLabel">${resultEl.identifier}:</div>
          <div>${escapeHtml(replaceVerticalBar(resultEl.text)) || 'kA'}</div>
        </div>`,
        )
        .join(' ')}
      </div>`,
      showCloseButton: true,
      onBeforeOpen: () => {
        modalOpen = true;
      },
      onAfterClose: () => {
        modalOpen = false;
        // Anyline.startScanning(); does not work right now when stopScanning before
      },
    });
  };

  Anyline.onReport = msg => {
    console.log('Report: ', msg);
  };

  Anyline.onDebug = msg => {
    alert(JSON.stringify(msg));
  };

  Anyline.onError = ({ code, message }) => {
    if (code === errorCodes.WEBCAM_ERROR) {
      console.error('webcam error: ', message);
    }
  };

  Anyline.onLoad = () => {
    console.log('ANYLINE LOADED on main thread');
  };

  Anyline.startScanning();

  window.Anyline = Anyline;
}

function remountAnylineJS() {
  Anyline.stopScanning();
  Anyline.dispose();
  mountAnylineJS(selectedPreset);
}

