# Web SDK

[Anyline](https://www.anyline.com) is a mobile OCR SDK, which can be customized to scan all kinds of numbers, characters, text and codes.

Web SDK is a standalone Anyline version for the browser.

Visit [js.anyline.com](https://js.anyline.com) for an official demo of Web SDK.

## Supported Usecases

- Tire Size
- Commercial Tire ID
- Tire Identification Number
- Vehicle Identification Number (VIN)
- Shipping Container (Horizontal and Vertical)
- 1D and 2D Barcodes
- Serial Number
- License Plate
- MRZ
- Austrian and German Drivers Licenses
- Meter Scanning

## Content

- **anylinejs**: Contains the files needed to self-host **Web SDK**
- **demo**: Contains **Web SDK** implementation examples
- **LICENSE**: The Third Party License Agreements
- **README**: Information about the repository

## Documentation

[API documentation](https://js.anyline.com/release/53.4.0/docs/index.html)

For full documentation visit: [https://documentation.anyline.com/web-sdk-component/latest/index.html](https://documentation.anyline.com/web-sdk-component/latest/index.html)

To test Anyline download the Example Sheets with testing material: [https://anyline.com/samples](https://anyline.com/samples)

## Install

`npm install @anyline/anyline-js`

## Usage

1. Copy the content of `anylinejs` to your webserver. In some cases you need to configure your webserver to serve `data` and `wasm.gz` files.

Web SDK has to be served from a web server that supports HTTPS.

2. Import Web SDK

```JavaScript
import { init } from '@anyline/anyline-js';
```

Alternatively you can also directly import `anyline.js` using a script tag:

```HTML
<script src="anyline.js"></script>
```

This will expose anylinejs to the window scope:

```JavaScript
const { init } = window.anylinejs;
```

3. Initialize Web SDK

```JavaScript
const anyline = init({
  preset: 'meter', // id, ocr, ehic, ...
  license: 'enter_your_license_key_here',
  // html container where anylineJS should be mounted to
  element: document.getElementById('root'),
  // location of the data files from step 1 (can also be an https link)
  anylinePath: '../anylinejs',
});
```

4. Start scanning

```JavaScript
anyline.startScanning().catch((e) => {
  alert(e.message);
});
```

5. Handle the scan result

```JavaScript
anyline.onResult = (result) => {
  console.log(result)
};
```

### Preload assets

In order to use preloading update your configuration as shown below and call the preload method. [Example](demo/preload-example.js)

```JavaScript
const anyline = init({
  ...
  preload: true,
  ...
});

anyline.preload();
```

## Try it locally

**Go to https://anyline.com/request/contact for a test-license**
When you've received a license for your domain, edit your host file to route your domain to localhost. Then:

`npm run demo`

Visit http://yourdomain.com:8080/demo

or

`npm run demo:network`

In this case the HTTPS server uses a self-generated certificate so you might need to bypass the security measures of your browser. With a proper test-license issued for your internal ip-address you can test it on other devices on the network (i.E. for smartphone testing).

### Typescript support

You can access the types by importing the `Types` object

```JavaScript
import { Types } from '@anyline/anyline-js';
```

## Available links:

<br>
Demo link -- https://js.anyline.com 
<br>
