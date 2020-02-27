const {
    init,
    errorCodes
} = window.anylinejs;

const viewConfig = {
    // captureResolution: '1080p',
    outerColor: '000000',
    outerAlpha: 0.5,
    cutouts: [{
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
    }, ],
};

const anylicense =
    'eyAiZGVidWdSZXBvcnRpbmciOiAib24iLCAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogdHJ1ZSwgImpzSWRlbnRpZmllciI6IFsgIjEyNy4wLjAuMSIsICIxOTIuMTY4LjAuMSIgXSwgImxpY2Vuc2VLZXlWZXJzaW9uIjogMiwgIm1ham9yVmVyc2lvbiI6ICI0IiwgIm1heERheXNOb3RSZXBvcnRlZCI6IDAsICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwgInBsYXRmb3JtIjogWyAiSlMiIF0sICJzY29wZSI6IFsgIkFMTCIgXSwgInNob3dQb3BVcEFmdGVyRXhwaXJ5IjogdHJ1ZSwgInNob3dXYXRlcm1hcmsiOiBmYWxzZSwgInRvbGVyYW5jZURheXMiOiAwLCAidmFsaWQiOiAiMjAyMC0wNC0yOSIgfQplNldmSElpc3VFS3BUaVRaNkJaMVJXT1BlMVJPaFgzVmE4cy8rMjVXY0VKTitBYXBQS2krOWNNQmJMTUpBcFRaCjRMVkN3OE9MUGIzYlVaOWVjKzhxV3N2MnEzc0E0cFUrSVA2bEI1ZVI1ZEVEQzZybVB1Y3NYWUFoMGVhbkVWM2kKNnBLRFp0UE0wdEJoZWpISndTMFV5ejdaQVJCb05ObGRUWHNkbVF4M3MyUzhTZnk0bzdyTXhjdUg5d2hjR3JwUApJTjJIZjkrakthb3JwUWhWUGJUNUVJVENldGlrTVlRN0h1THl3Mi9HSm9lY2k3Y3dSVjd4Vjg0RkhhTkxWU0hSCjlpMDl0Z2ltV3krcVoxOVVGVkw2RmV2eVJicGFaNEhsb1FxTXVWbTFXQ2syWnMybCt3bWM0SUwwbXVlZzdBcG0KM3RYWFpFZ0FZbFIrZjd0eC9CZVUwUT09Cg==';

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