const viewConfig = {
  outerColor: '000000',
  outerAlpha: 0.5,
  cutouts: [
    {
      cancelOnResult: false,
      cutoutConfig: {
        strokeWidth: 2,
        cornerRadius: 4,
        strokeColor: 'FFFFFFFF',
        feedbackStrokeColor: '0099FF',
      },
      scanFeedback: {
        style: 'contour_point',
        strokeColor: '0099FF',
        fillColor: '300099FF',
        strokeWidth: 2,
        cornerRadius: 4,
      },
    },
  ],
};

const root = document.getElementById('root');
let selectedPreset = undefined;
let Anyline;

function mountAnylineJS(preset) {
  try{

  selectedPreset = preset;

  Anyline = window.anylinejs.init({
    config: {},
    preset: preset.value,
    viewConfig,
    license: demoLicense,
    element: root,
    debugAnyline: true,
    anylinePath: '../anylinejs'
  });

  Anyline.onResult = result => {
    console.log('Result: ', result);
    alert(JSON.stringify(result.result, null, 2))
  };

  Anyline.onError = ({ code, message }) => {
    if (code === window.anylinejs.errorCodes.WEBCAM_ERROR) {
      console.error('webcam error: ', message);
    }
    console.error(code, message)
  };

  Anyline.onLoad = () => {
    console.log('ANYLINE LOADED');
  };

  
  Anyline.startScanning().catch(e => alert(e.message))

}catch(e){
  alert(e.message);
  console.error(e)
}
}

function remountAnylineJS() {
  Anyline.stopScanning();
  Anyline.dispose();
  mountAnylineJS(selectedPreset);
}

function enableFlash() {
  Anyline.activateFlash(true);
}

function disableFlash() {
  Anyline.activateFlash(false);
}
