# Anyline Web SDK

[![npm version](https://img.shields.io/npm/v/@anyline/anyline-js.svg)](https://www.npmjs.com/package/@anyline/anyline-js)
[![License](https://img.shields.io/badge/license-commercial-blue.svg)](LICENSE.md)

[Anyline](https://www.anyline.com) Web SDK enables OCR and barcode scanning directly in the browser.

**[Live Demo](https://web-trial.anyline.com)** | **[Documentation](https://documentation.anyline.com/web-sdk-component/latest/index.html)** | **[API Reference](https://documentation.anyline.com/web-sdk-component/latest/api-reference.html)**

## Supported Use Cases

- **Barcode** - QR Code, Data Matrix, Aztec, PDF417, Code 128, EAN, UPC, and more
- **ID Scanning** - MRZ (passports, ID cards) and driving licenses
- **Tire & Automotive** - VIN, TIN, tire size, license plates
- **Meters** - Analog, digital, and dial meters
- **OCR** - Shipping containers and custom OCR

See the [documentation](https://documentation.anyline.com/web-sdk-component/latest/index.html) for the full list of supported formats and regions.

## Installation

```bash
npm install @anyline/anyline-js
```

Or via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@anyline/anyline-js/anyline.js"></script>
```

## Quick Start

**HTML:**

```html
<div id="scanner-root" style="width: 100%; height: 100vh;"></div>
```

**TypeScript/JavaScript:**

```typescript
import { init } from '@anyline/anyline-js';

// Initialize the scanner
const anyline = init({
  // Your Anyline license key (obtain at anyline.com/request/contact)
  license: 'YOUR_LICENSE_KEY',
  // DOM element where the scanner will be mounted
  element: document.getElementById('scanner-root'),
  // Preset for the scan type (see documentation for all presets)
  preset: 'vin',
});

// Handle scan results
anyline.onResult = ({ result }) => {
  console.log('Scanned:', result);
};

// Start the camera and begin scanning
anyline.startScanning().catch((error) => {
  console.error('Failed to start:', error);
});

// Clean up resources when done
window.addEventListener('beforeunload', () => {
  anyline.dispose();
});
```

> **Note:** Web SDK requires HTTPS (except localhost) and camera permissions. The browser will prompt the user to allow camera access.

For available presets and configuration options, see the [Getting Started Guide](https://documentation.anyline.com/web-sdk-component/latest/getting_started.html).

## Self-Hosting Assets

By default, the SDK loads assets from Anyline's CDN. To self-host these assets for better performance or to comply with network restrictions:

1. Copy the `anylinejs/` folder to your web server
2. Set the `anylinePath` option to point to the folder location

```typescript
const anyline = init({
  license: 'YOUR_LICENSE_KEY',
  element: document.getElementById('scanner-root'),
  preset: 'vin',
  anylinePath: '/path/to/anylinejs',
});
```

See [Performance Optimization](https://documentation.anyline.com/web-sdk-component/latest/performance_notes.html) for CDN configuration and caching details.

## Documentation

- [Getting Started](https://documentation.anyline.com/web-sdk-component/latest/getting_started.html) - Installation, presets, and configuration
- [Examples](https://documentation.anyline.com/web-sdk-component/latest/examples.html) - Code examples for common use cases
- [API Reference](https://documentation.anyline.com/web-sdk-component/latest/api-reference.html) - Complete API documentation
- [Configuration Guide](https://documentation.anyline.com/web-sdk-component/latest/configurations.html) - Plugin and view configuration

## Try it Locally

The package includes a demo application. To run it:

1. [Request a test license](https://anyline.com/request/contact) for your domain
2. Edit your hosts file to route your domain to localhost (licenses are domain-restricted)
3. Run the demo:

```bash
npm run demo
```

4. Visit `http://yourdomain.com:8080/demo`

For smartphone testing over the network (HTTPS on port 8443):

```bash
npm run demo:network
```

Open `https://<your-ip>:8443/` on your phone and accept the self-signed certificate warning, then choose the demo folder for running demo.

## Package Contents

- **anylinejs/** - Assets for self-hosting
- **docs/** - API documentation
- **types/** - TypeScript type definitions
- **anyline.js** - Main SDK library
- **LICENSE.md** - Third-party license agreements

## Resources

- [Live Demo](https://web-trial.anyline.com)
- [Example Sheets](https://anyline.com/example-sheets) - Test materials for scanning
- [Request a License](https://anyline.com/request/contact)

## License

This SDK requires a commercial license from Anyline. [Request a trial license](https://anyline.com/request/contact) to get started.

See [LICENSE.md](LICENSE.md) for third-party license agreements.
