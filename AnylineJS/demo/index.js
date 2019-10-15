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
  'eyAiZGVidWdSZXBvcnRpbmciOiAib24iLCAianNJZGVudGlmaWVyIjogWyAiMTI3LjAuMC4xIiBdLCAibGljZW5zZUtleVZlcnNpb24iOiAyLCAibWFqb3JWZXJzaW9uIjogIjExIiwgIm1heERheXNOb3RSZXBvcnRlZCI6IDAsICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwgInBsYXRmb3JtIjogWyAiSlMiIF0sICJzY29wZSI6IFsgIkFMTCIgXSwgInNob3dQb3BVcEFmdGVyRXhwaXJ5IjogdHJ1ZSwgInNob3dXYXRlcm1hcmsiOiBmYWxzZSwgInRvbGVyYW5jZURheXMiOiAwLCAidmFsaWQiOiAiMjAxOS0xMS0wMSIgfQp6K1BCNHRWeTl6alo0a3EwOHRQd0pRK2ErcDluMEkvTVAvMHNhMkhDbml5WHRMZC80TlN1ZzEraUNUY3JicjdNCnJlSU8xZ3Ira0piNHhaSUVZQm1POTdGTWxJaWxpNC9BbXkwanRiSGRJUjg3eW5nMlJIYzc4TnBDWGFhb3ljbXUKU2E3ZHNoc20wMkFiV2hLaVhhOURRRFNXV3FDSmN6Qk9odFNudTlPeG8yeHJLcHdwN3Y5R1NnZnJ2cnV4bVJucwpKZjNRK2prYzhxUXZRRjc3MkxabGtPRXRzQjhPT2cxTFluWFpRVUg1dU5RRnYzR293eEluZEFmZG5yUWZ2NTkyCmwybG5JUnpPZ0ZoNmtmK0ROM3B4bi9OdjFxeHB0V3htNDUyVWVCU0dseW1YTTd5eE9PeWR5S0JFeVE4UnpLSFYKbTdwTWdjTy9KQXpoZERwcUFTamRpUT09Cg==';

const root = document.getElementById('root');

function mountAnylineJS(preset) {
  const Anyline = init({
    preset: preset.value,
    viewConfig,
    license: anylicense,
    element: root,
    anylinePath: '../../anylinejs',
  });

  Anyline.onResult = result => {
    console.log('Result: ', result);
    let msg = JSON.stringify(result.result);
    alert(msg);
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
}
