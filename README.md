# AnylineJS

[Anyline](https://www.anyline.com) is a mobile OCR SDK, which can be customized to scan all kinds of numbers, characters, text and codes.

AnylineJS is a standalone Anyline version for the browser.

Visit [js.anyline.com](https://js.anyline.com) for an official demo of AnylineJS.

## Supported Usecases

- Vehicle identification number (VIN),
- shipping container (Horizontal and Vertical),
- Barcode,
- Serial number,
- license plate,
- MRZ,
- EHIC (eCard),
- german ID front,
- austrian, german and UK drivers licenses
- meter scanning

## Content

- **anyline.js**: Main lib to self-host **AnylineJS**
- **anylinejs**: Contains the files needed to self-host **AnylineJS**
- **demo**: Contains **AnylineJS** implementation examples
- **LICENSE**: The Third Party License Agreements
- **README**: Information about the repository

## Documentation

[API documentation](https://js.anyline.com/release/33.0.0/docs/index.html)

For full documentation visit: [https://documentation.anyline.com/toc/platforms/javascript/index.html](https://documentation.anyline.com/toc/platforms/javascript/index.html)

To test Anyline download the Example Sheets with testing material: [https://anyline.com/samples](https://anyline.com/samples)

## Install

`npm install @anyline/anyline-js`

## Usage

1. Copy the content of `anylinejs` to your webserver. In some cases you need to configure your webserver to serve `data` and `wasm.gz` files.

AnylineJS has to be served from a web server that supports HTTPS.

2. Import AnylineJS

```JavaScript
import { init } from '@anyline/anyline-js;
```

Alternatively you can also directly import `anyline.js` using a script tag:

```HTML
<script src="anyline.js"></script>
```

This will expose anylinejs to the window scope:

```JavaScript
const { init } = window.anylinejs;`
```

3. Initialize AnylineJS

```JavaScript
const anyline = init({
  preset: 'meter', // id, ocr, eCard, ...
  license: 'enter_your_license_key_here',
  // html container where anylineJS should be mounted to
  element: document.getElementById('root'),
  // location of the data files from step 1 (can also be an https link)
  anylinePath: '../anylinejs',
});
```

4. Start scanning

```JavaScript
anyline.startScanning().catch(console.error);
```

5. Handle the scan result

```JavaScript
anyline.onResult((data) => {
  console.log(data)
});
```

## Try it locally

`npm run demo`

Visit https://127.0.0.1:8443/demo. The HTTPS server uses a self-generated certificate so you might need to bypass the security measures of your browser.

**The license included in the demo only allows AnylineJS to run on 127.0.0.1 and localhost**

### Typescript support

You can access the types by importing the `Types` object

```JavaScript
import { Types } from '@anyline/anyline-js;
```

## Main-thread version ( not recomended )

The main-thread version is currently in beta and can be downloaded here (You can try to use it as a fallback for older devices):

Download link -- https://js.anyline.com/release/33.0.0_main/anylinejs.zip<br>
CDN link -- https://js.anyline.com/release/33.0.0_main/anyline.js

## Available links:

<br>
Worker Demo link -- https://js.anyline.com/release/33.0.0/demo/index.html<br>
Worker Archive link -- https://js.anyline.com/release/33.0.0/anylinejs.zip<br>
Worker CDN link -- https://js.anyline.com/release/33.0.0/anyline.js<br>
<br>
Main Demo link -- https://js.anyline.com/beta/33.0.0_main/demo/index.html<br>
Main Archive link -- https://js.anyline.com/beta/33.0.0_main/anylinejs.zip<br>
Main CDN link -- https://js.anyline.com/beta/33.0.0_main/anyline.js<br>
