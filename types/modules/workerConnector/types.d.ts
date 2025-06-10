export interface KeyAble {
    [key: string]: any;
}
export interface ICutout {
    cutoutConfig: {
        alignment?: 'center' | 'top_half' | 'bottom_half';
        style?: 'contour_rect' | 'rect';
        ratioFromSize: {
            width: number;
            height: number;
        };
        delay?: number;
        animation?: string;
        width: number;
        maxWidthPercent: string;
        maxHeightPercent?: string;
        outerColor?: string;
        outerAlpha?: number;
        strokeColor?: string;
        inactiveStrokeColor?: string;
        cropOffset?: {
            x: number;
            y: number;
        };
        cropPadding?: {
            x: number;
            y: number;
        };
        strokeWidth?: number;
        cornerRadius?: number;
        feedbackStrokeColor?: string;
    };
    scanFeedback?: {
        style?: 'contour_rect' | 'rect';
        animation?: 'traverse_multi';
        animationDuration?: number;
        timeout?: number;
        strokeWidth?: number;
        strokeColor?: string;
        beepOnResult?: boolean;
        vibrateOnResult?: boolean;
        blinkAnimationOnResult?: boolean;
    };
}
export interface Cutouts {
    [key: string]: ICutout;
}
export interface ViewConfig {
    outerColor?: string;
    outerAlpha?: number;
    /**
     * Feedback animation style. Defaults to a 'BLINK_ANIMATION' animation.
     */
    feedbackAnimationStyle?: FeedbackAnimationStyle;
    cutouts: ICutout[];
    feedbackStyle?: string;
    animation?: string;
}
export interface UiFeedbackBase {
    presetName: PresetName;
}
export interface UiFeedbackImage {
    src: string;
    alt?: string;
}
export interface UiFeedbackTin extends UiFeedbackBase {
    presetName: 'tin';
    lighting?: {
        imageTooDark?: UiFeedbackImage;
        imageTooBright?: UiFeedbackImage;
    };
    distance?: {
        imageMoveCloser?: UiFeedbackImage;
        imageMoveBack?: UiFeedbackImage;
    };
}
export interface UiFeedbackVin extends UiFeedbackBase {
    presetName: 'vin';
}
export type UiFeedbackConfig = UiFeedbackTin | UiFeedbackVin;
export interface ViewPluginConfig {
    uiFeedback?: {
        dynamic: UiFeedbackConfig;
    };
}
export interface AnylineJSResult {
    result: any;
    fullImage: ImageData | undefined;
    scanTime: number;
}
/**
 * blink - sets the feedback to a blink animation (DEFAULT)
 * path - sets the feedback to a path animation
 */
export type FeedbackAnimationStyle = 'blink' | 'path';
export interface LegacyErrorObject {
    code: number;
    message: string;
}
export interface CameraAPI {
    /**
     * Mirrors the stream (i.E for front-facing cameras)
     *
     * @param state - if the stream should be mirrored or not
     *
     */
    mirrorStream(state: boolean): void;
    /**
     * Sets a specific camera as input
     *
     * @param deviceId - the id of the camera
     *
     */
    setCamera(deviceId: string): void;
    /**
     * Reappends the camera. This can help in case you experience a camera stream failure when resuming to the webapp after sleep / longer suspension.
     *
     * @remarks example: window.onfocus = () => anyline.camera.reappend();
     *
     */
    reappend(): void;
    /**
     * Refocus the camera
     *
     * @remarks This feature works currently only on Google Chrome for Android
     *
     * @returns A promise
     *
     * @throws {@link OnlyAndroidChromeError}
     * This exception is thrown if the browser is not capabale of this feature
     *
     */
    refocus(): Promise<void>;
    /**
     * Activates the camera flash light
     *
     * @remarks This feature works currently only on Google Chrome for Android
     *
     * @returns A promise
     *
     * @throws {@link OnlyAndroidChromeError}
     * This exception is thrown if the browser is not capabale of this feature
     *
     */
    activateFlash(state: boolean): Promise<void>;
}
interface StartVariable {
    key: string;
    value: string | number | boolean;
}
export interface PluginConfig {
    /**
     * id - Sets a name for the scan plugin
     */
    id?: string;
    /**
     * cancelOnResult - Sets whether or not to continue scanning once a result is found
     */
    cancelOnResult?: boolean;
    /**
     * startScanDelay - Sets an initial time period where scanned frames are not processed as results.
     */
    startScanDelay?: number;
    /**
     * startVariables - Allows to fine-tune a list of options for plugins.
     */
    startVariables?: StartVariable[];
    /**
     * consecutiveEqualResultFilter - This option allows to fine-tune the handling results of the same content when scanning continuously.
     * If the option is set to -1, equal results will not be reported again until the scanning process is stopped.
     * Setting this option to 0 will report equal results every time it is found.
     * Setting this option to greater than 0 indicates how much time must pass by not detecting the result before it will be detected again.
     * (This feature is currently only supported in Barcode scanning).
     */
    consecutiveEqualResultFilter?: number;
    /**
     * barcodeConfig - Configuration for scanning barcode
     */
    barcodeConfig?: KeyAble;
    /**
     * meterConfig - Configuration for scanning meters
     */
    meterConfig?: KeyAble;
    /**
     * universalIdConfig - Configuration for scanning all kinds of identification documents
     */
    universalIdConfig?: KeyAble;
    /**
     * mrzConfig - Configuration for scanning machine-readable zones (MRZ) of passports and other IDs
     */
    mrzConfig?: KeyAble;
    /**
     * licensePlateConfig - Configuration for scanning license plates
     */
    licensePlateConfig?: KeyAble;
    /**
     * tinConfig - Configuration for scanning TIN numbers
     */
    tinConfig?: KeyAble;
    /**
     * tireSizeConfig - Configuration for scanning Tire Size Specifications
     */
    tireSizeConfig?: KeyAble;
    /**
     * commercialTireIdConfig - Configuration for scanning commercial Tire IDs
     */
    commercialTireIdConfig?: KeyAble;
    /**
     * tireMakeConfig - Configuration for scanning Tire Makes
     */
    tireMakeConfig?: KeyAble;
    /**
     * vinConfig - Configuration for scanning vehicle identification numbers (VIN)
     */
    vinConfig?: KeyAble;
    /**
     * containerConfig - Configuration for scanning shipping container numbers
     */
    containerConfig?: KeyAble;
    /**
     * ocrConfig - Configuration for general OCR scanning use-cases
     */
    ocrConfig?: KeyAble;
}
export interface LockOrientation {
    /**
     * lock - Defines whether the screen orientation should be locked to portrait.
     */
    lock: boolean;
    /**
     * element - Element used for fullscreen mode. This is required in order to lock the screen.
     * If no element was set it will default to the element set as root in the configuration (AnylineJSParams).
     */
    element?: HTMLElement;
}
export type LockPortraitOrientation = LockOrientation;
export type LandscapeOrientation = LockOrientation;
export interface AnylineJSParams {
    /**
     * license - AnylineJS license string
     */
    license: string;
    /**
     * element - HTMLElement where anylineJS should be mounted into
     */
    element: HTMLElement;
    /**
     * lockOrientation - If set locks the screen orientation to portrait. (Android)
     */
    lockPortraitOrientation?: LockPortraitOrientation;
    /**
     * lockOrientation - If set locks the screen orientation to landscape and overrides 'lockPortraitOrientation'. (Android)
     */
    landscapeOrientation?: LandscapeOrientation;
    /**
     * preset - Module preset
     */
    preset?: PresetName;
    /**
     * preload - preloads the assets by a given preset (eg. 'barcode')
     */
    preload?: boolean;
    /**
     * preloadCallback - set a callback to execute custom code after all assets were loaded. Callback will override the default behavior.
     */
    preloadCallback?: () => void;
    /**
     * anylinePath - Path to anylineJS data assets (defaults to cdn hosted assets)
     */
    anylinePath?: string;
    /**
     * config - AnylineJS configuration object
     */
    config?: PluginConfig;
    /**
     * Activate haptic feedback on mobile devices.
     */
    hapticFeedback?: boolean;
    /**
     * Activate flash feedback on mobile devices.
     */
    flashOnResult?: boolean;
    /**
     * viewConfig - Appearance configuration of the cutout
     */
    viewConfig?: ViewConfig;
    /**
     * debugAnyline - Flag to output more verbose logs | pass 'screen' to additionally render logging overlay (beta)
     */
    debugAnyline?: boolean | string;
    /**
     * Path to the web assembly binary.
     */
    wasmPath?: string;
    /**
     * estimateMainCamera - [default: true] Flag to disable camera estimation (not recommended)
     */
    estimateMainCamera?: boolean;
    /**
     * loadingScreen - HTML string to replace the default loader (`<div>loading...</div>`)
     */
    loadingScreen?: string;
    /**
     * coverVideo - [default: true] Reverts a letterbox fix (not recommended to set to false)
     */
    coverVideo?: boolean;
    /**
     * initialFlashOn - [default: false] starts scanning with camera flash state (only Android Chrome support)
     */
    initialFlashOn?: boolean;
    /**
     * scaleDown - [default: false] Scales down the processed image for potential performance boost in a few use cases (barcode)
     */
    scaleDown?: boolean;
    /**
     * slowMessageTimeout - [default: 14000] Sets a timeout to start scanning
     */
    slowMessageTimeout?: number;
    /**
     * mediaConstraints - overwrite mediaConstraints of the camera feed (i.E to use a certain resolution or a specific camera)
     */
    mediaConstraints?: MediaStreamConstraints;
    /**
     * videoSrc - Https url pointing to a video stream to exchange the camera feed (for debugging, testing purposes)
     */
    videoSrc?: string;
    /**
     * retryCameraAccess - Flag if the system should retry camera access with fallback default media constraints
     */
    retryCameraAccess?: boolean;
    /**
     * useFullUrlBundleId - Flag to consider the whole url path as the bundleId (i.E  example.com/apps/scanner  vs. example.com)
     */
    useFullUrlBundleId?: boolean;
    /**
     * throttleImagePass - throttle the time between processing images (in ms)
     */
    throttleImagePass?: number;
    /**
     * mirrorOnDesktop - (default: true) disable mirroring on desktop browsers (i.E if you are using a back-facing camera on desktop)
     */
    mirrorOnDesktop?: boolean;
    /**
     * correlationId -  UUIDv4 string to define user Correlation ID
     */
    correlationId?: string;
    /**
     * enableCaching -  [default: true] Enable caching mechanism for large binary data
     */
    enableCaching?: boolean;
    /**
     * @ignore
     * demo -  [default: undefined] Object containing information about authenticated users
     */
    demo?: object;
    /**
     * @ignore
     * demo -  [default: undefined] internal development flags, not intended for external use
     */
    developmentFlags?: object;
}
export type PresetName = 'lpt' | 'lpt_eu' | 'lpt_us' | 'lpt_canada' | 'universalid_mrz' | 'universalid_dl_at_de' | 'universalid_dl_at_de_strict' | 'universalid_es_it_pt' | 'meter' | 'dialmeter' | 'verbund' | 'vin' | 'ocr' | 'qr' | 'barcode_pdf417_parsed' | 'barcode_pdf417' | 'all_barcode_formats' | 'legacy_barcode' | 'container' | 'containerVertical' | 'tire_size' | 'tin' | 'tin_dot' | 'tire_id';
export {};
