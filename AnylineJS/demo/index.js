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

const anylicense =
  'eyAiZGVidWdSZXBvcnRpbmciOiAib24iLCAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsICJqc0lkZW50aWZpZXIiOiBbICIxMjcuMC4wLjEiLCAibG9jYWxob3N0IiBdLCAibGljZW5zZUtleVZlcnNpb24iOiAyLCAibWFqb3JWZXJzaW9uIjogIjIwIiwgIm1heERheXNOb3RSZXBvcnRlZCI6IDAsICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwgInBsYXRmb3JtIjogWyAiSlMiIF0sICJzY29wZSI6IFsgIkFMTCIgXSwgInNob3dQb3BVcEFmdGVyRXhwaXJ5IjogZmFsc2UsICJzaG93V2F0ZXJtYXJrIjogZmFsc2UsICJ0b2xlcmFuY2VEYXlzIjogMCwgInZhbGlkIjogIjIwMjAtMDctMzAiIH0KdGVqMGVGYW1MWUlHM1VPa1FyM3A3andsYVliUWdGTXlxdDZjUHU2WU1NbTJtTWdoSXQyVmM5ZVRiS2JsMVVrTwpMN0JqVEVGTFNZQVNYV3AwL2RBdWV0dWpYeGtOOW9GMXRvYXRuRFB0MnkvY1p4emlmZnBZbTlocy94VXB3dzVRCml6SHZ4ZGhDb0ZyUW1xdnNxUThWRHNxNExveE00c0dIdCtQb1FIMkdLWnRaUDc4NmJRN3AwdzUyZkRmYkpOd1QKOXVpTXRHQ0s3ais3ZkE4TGo0OTllMUtZZDdKbENSZS9XQndvY2k3MnVFZ1VkWXl3bW1HRHJIVFFWcHZFQzMydAp3UnRDU0F6ZlJwRU9mMThRb0VqK29pbUxyZEQ5d1k1VDlBQ2EwZmZ1b0ZIbUJLZ0RrRVdDRytnaEhxd2NwZmNoCkx5b3N2bkJWYml1QTBKQ2F6a0d4VGc9PQo=';

const root = document.getElementById('root');

function mountAnylineJS(preset) {
  const Anyline = init({
    preset: preset.value,
    viewConfig,
    license: anylicense,
    element: root,
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
