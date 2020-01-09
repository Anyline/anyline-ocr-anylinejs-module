const { init, errorCodes } = window.anylinejs;

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

const anylicense =
  'eyAiZGVidWdSZXBvcnRpbmciOiAib24iLCAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogdHJ1ZSwgImpzSWRlbnRpZmllciI6IFsgIjEyNy4wLjAuMSIsICIxOTIuMTY4LjAuMTAiIF0sICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsICJtYWpvclZlcnNpb24iOiAiNCIsICJtYXhEYXlzTm90UmVwb3J0ZWQiOiAwLCAicGluZ1JlcG9ydGluZyI6IHRydWUsICJwbGF0Zm9ybSI6IFsgIkpTIiBdLCAic2NvcGUiOiBbICJBTEwiIF0sICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IHRydWUsICJzaG93V2F0ZXJtYXJrIjogZmFsc2UsICJ0b2xlcmFuY2VEYXlzIjogMCwgInZhbGlkIjogIjIwMjAtMDItMjkiIH0KUVNSL3U5LzYxOGVOcS9jcmEyMkFsWEFrNi9abzY5Z3AycytpWEhyejd1TjZiNmRrUnppNy9UYTVKTGladml2YQpGSDFnWTR4QUlvVTBqblpQRUp2WDJMWEplandCRGl6K2NpZEozMFhRS1kvNndSc3BkUnpwa0NDQnVoUE1GTkl0CjBNY0ZZUjUrRGNlRFI2aVZhTFczYmwyMUVQaDdoZzA0b2dBRDBUOXNMS0JIVFB4Sk5BT045VThscDk1bnNKOEUKVXdiVjFPT2Z0Qm94THoyU3lBMzZocjlocTNUZE1uNVo2ZWFmOTFVc1dhRlgwN2hsc2xYR0ZzdzljYVk5Mnd4WgpiUzlDUU9nOExjUHhoYmtYcVdCSDY5YnRvdWNrdWF2cmNXUjh4YmptTzZGMERHUFdXYlJ4SHVkM3ZTUXp0NFh3CllqVkhCV0RULzNmTjBpT2JkcHpsRGc9PQo=';

const root = document.getElementById('root');

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

function mountAnylineJS(preset) {
  const Anyline = init({
    preset: preset.value,
    viewConfig,
    license: anylicense,
    element: root,
    anylinePath: '../../anylinejs',
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
      },
    });
  };

  Anyline.onReport = msg => {
    console.log('Report: ', msg);
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
