export declare class AnylineError extends Error {
    private readonly messageText;
    private readonly code;
    private readonly error;
    constructor(code: number, message: string, error?: Error);
    toString(): string;
}

export declare class AnylineJS {
    private readonly params;
    private readonly dependencies;
    private preloadDone;
    private readonly uiFeedbackService;
    /* Excluded from this release type: __constructor */
    preload(): void;
    setFocusDistance(focusDistance: number): void;
    /**
     *
     * Callback called when some (not all) Errors occur
     * @deprecated since version 31.0.0 (Errors should be catched when calling the methods, which provides proper stack-trace)
     *
     * @param error - Error object containing errorCode (.code) and .message
     *
     */
    onError: (error: LegacyErrorObject) => void;
    /**
     *
     * Callback called when scanning is started
     * @deprecated since version 31.0.0 (startScanning is now resolving a promise)
     *
     * @param video - video Element
     *
     */
    onLoad: (video: HTMLVideoElement) => void;
    /**
     * Callback called when a scan yielded in a result
     *
     * @param result - object containing the scanned result and image
     *
     */
    onResult: (result: AnylineJSResult) => void;
    /**
     * Callback called when any Barcodes are detected.
     *
     * @param result - object containing the scanned result and images
     *
     */
    onScannedBarcodes: (result: AnylineJSResult) => void;
    /**
     * Callback called when a scan yielded in a performance log
     *
     * @param perflog - object containing the performance log
     *
     */
    onPerformanceLog: (perflog: any) => void;
    /**
     * Returns an object with the full image and its cutout from the SDK.
     *
     * @returns {ImageObject|undefined} - An object with full image and its cutout, or undefined if no image is in the buffer.
     */
    getFrame(): ImageObject | undefined;
    private state;
    private timeBeforeImageSend;
    private fullImage;
    private log2debug;
    isLoaded: boolean;
    /**
     * Camera API
     */
    camera: CameraAPI;
    /**
     * Get current state of AnylineJS
     *
     */
    getState(): State;
    private initialize;
    private handleRunSkippedMessage;
    private handleInfoMessage;
    private lockPortrait;
    private lockLandscape;
    handleImageRequest(): Promise<void>;
    private postHooks;
    /**
     * Starts the scan process
     *
     * @returns A promise resolving to:
     * - `HTMLVideoElement` when called from INITIALIZED state (starts camera and scanning)
     * - `undefined` when called from STOPPED or PAUSED states
     *
     * @throws PermissionError
     * This exception is thrown if the camera access was denied
     *
     * @throws `AnylineError`
     * This exception is thrown if something internally is wrong like licensing issues
     *
     * @throws `DisposedError`
     * This exception is thrown if anylineJS is already disposed
     */
    startScanning(): Promise<HTMLVideoElement | undefined>;
    /**
     * Stops the scan process
     */
    stopScanning(): void;
    /**
     * Pause the scan process
     */
    pauseScanning(): void;
    /**
     * Resumes the scan process
     */
    resumeScanning(): Promise<void>;
    /**
     * Disposes anylineJS by unmounting it from the dom and cleaning up
     *
     */
    dispose(): void;
}

export declare interface AnylineJSParams {
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
     * pluginId - Specifies the scanning plugin to use (auto-set when using a preset, can be overridden).
     *
     * Available plugins: barcode, meter, universal_id, mrz, license_plate, tin, tire_size,
     * commercial_tire_id, tire_make, vin, container, ocr, vin_with_user_guidance
     *
     * @example { preset: 'vin', pluginId: 'vin_with_user_guidance' } // Override preset's plugin
     */
    pluginId?: PluginId;
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

export declare interface AnylineJSResult {
    result: any;
    fullImage: ImageData | undefined;
    scanTime: number;
}

export declare interface CameraAPI {
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
     * @remarks example: globalThis.onfocus = () => anyline.camera.reappend();
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
     * @throws `OnlyAndroidChromeError`
     * This exception is thrown if the browser is not capabale of this feature
     *
     */
    refocus(): Promise<void>;
    /**
     * Activates the camera flash light
     *
     * @remarks This feature works on Google Chrome for Android and Safari 18.4+
     *
     * @returns A promise
     *
     * @throws `OnlyAndroidChromeError`
     * This exception is thrown if the browser does not support this feature
     *
     */
    activateFlash(state: boolean): Promise<void>;
}

declare class CameraManager {
    private readonly dependencies;
    private readonly idealDimensionConstraints;
    defaultConstraints: {
        video: {
            width: {
                min: number;
                ideal: number;
                max: number;
            };
            height: {
                min: number;
                ideal: number;
                max: number;
            };
            facingMode: {
                ideal: string;
            };
        };
        audio: boolean;
    };
    activeStream?: MediaStream;
    activeConstraints?: MediaStreamConstraints;
    private currentTryOutIndex?;
    private cameras?;
    constructor(dependencies: Dependencies_2);
    nextCameraStream(): Promise<MediaStream>;
    setCamera(deviceId: string): Promise<MediaStream>;
    collectCameras(): Promise<MediaDeviceInfo[]>;
    getStream(mediaConstraints?: MediaStreamConstraints): Promise<MediaStream>;
    getOptimalMainStream(): Promise<MediaStream>;
    closeStream(): void;
    setFlashState(state: boolean): Promise<void>;
    refocus(): Promise<void>;
    setFocusDistance(focusDistance: number | undefined): Promise<void>;
}

export declare class CameraStreamError extends AnylineError {
    /**
     * Error thrown when the camera stream could not be provided (i.E missing permissions)
     *
     */
    constructor(e?: Error);
}

declare type CutoutFrame = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export declare interface Cutouts {
    [key: string]: ICutout;
}

declare type Dependencies = {
    imageService: ImageService;
    uiService: UiServiceInterface;
    anylineWorker: any;
    uiFeedbackService?: UiFeedbackService;
};

declare type Dependencies_2 = {
    mediaDevices: MediaDevices;
};

declare type Dependencies_3 = {
    cameraManager: CameraManager;
};

export declare class DisposedError extends AnylineError {
    constructor(e?: Error);
}

/**
 * blink - sets the feedback to a blink animation (DEFAULT)
 * path - sets the feedback to a path animation
 */
export declare type FeedbackAnimationStyle = 'blink' | 'path';

export declare interface ICutout {
    cutoutConfig: {
        alignment?: 'center' | 'top_half' | 'bottom_half';
        style?: 'contour_rect' | 'rect';
        ratioFromSize?: {
            width: number;
            height: number;
        };
        delay?: number;
        animation?: string;
        width?: number;
        height?: number;
        maxWidthPercent?: string;
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
        offset?: {
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
        fillColor?: string;
        cornerRadius?: number;
        beepOnResult?: boolean;
        vibrateOnResult?: boolean;
        blinkAnimationOnResult?: boolean;
    };
}

/**
 * Object containing captured image data from the camera frame.
 */
declare type ImageObject = {
    /** The full camera frame as ImageData */
    fullImage: ImageData;
    /** The cropped cutout area as ImageData, if available */
    cutoutImage?: ImageData;
};

declare class ImageService {
    private readonly params;
    cameraManager: CameraManager;
    isMirrored: boolean | undefined;
    private cutoutList;
    private readonly canvas;
    scalingFactor: number;
    scalingFactorCutout: number;
    private videoInstance;
    private videoInstanceVisual;
    private lastFullImage;
    private lastCutoutImage;
    cutoutFrame: CutoutFrame;
    constructor(params: Params, dependencies: Dependencies_3);
    getCutoutList(): StoredCutouts;
    setNextCamera(): Promise<void>;
    setCamera(deviceId: string): Promise<void>;
    private provideStream;
    mirrorStream(value: boolean): void;
    appendVideoSrc(src: MediaStream | string, srcAttribute?: 'srcObject' | 'src'): void;
    /**
     * Reappends the last stream. This may help with possible issues when reentering the webapp after sleep
     */
    reappendStream(): Promise<void>;
    appendStream({ mediaConstraints, estimateMainCamera, isRetry, retry, }: {
        mediaConstraints: MediaStreamConstraints | undefined;
        estimateMainCamera?: boolean;
        isRetry?: boolean;
        retry?: boolean;
    }): Promise<MediaStream>;
    closeStream(): void;
    /**
     * Can be called to prevent possible memory leaks
     */
    clearMemory(): void;
    getVideoInstanceVisual(): HTMLVideoElement | undefined;
    applyScalingFactor(data: {
        points: number[][];
    }[]): {
        points: number[][];
    }[];
    cutoutBuffer(): ImageData;
    getSubimage(imageData: ImageData, frame: CutoutFrame): ImageData | undefined;
    cropImageBuffer({ x, y, width, height }?: {
        x?: number | undefined;
        y?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }): ImageData;
    private getCutoutImages;
    getCutout({ scaled }: {
        scaled: boolean;
    }): {
        x: number;
        y: number;
        top: number;
        left: number;
        width: number;
        height: number;
    } | {
        x: any;
        y: any;
        width: number;
        height: number;
        top?: undefined;
        left?: undefined;
    };
    getCutoutImage(): ImageData | undefined;
    getLastCutoutImage(): ImageData | undefined;
    getFullImage(): string;
    getLastFullImage(): string;
}

declare enum InfoMessageType {
    lighting = "$lightingCondition",
    distance = "distance",
    format = "$format_invalid_content"
}

export declare const init: (params: AnylineJSParams) => AnylineJS;

export declare interface KeyAble {
    [key: string]: any;
}

export declare type LandscapeOrientation = LockOrientation;

export declare interface LegacyErrorObject {
    code: number;
    message: string;
}

export declare class LicenseParseError extends AnylineError {
    constructor(e?: Error);
}

export declare interface LockOrientation {
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

export declare type LockPortraitOrientation = LockOrientation;

export declare class OnlyAndroidChromeError extends AnylineError {
    constructor(e?: Error);
}

declare type Params = {
    anylineJScontainerEl: HTMLElement | null;
    scaleDown?: boolean;
    /** @default true */
    mirrorOnDesktop?: boolean;
};

export declare interface PluginConfig {
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
     * japaneseLandingPermissionConfig - Configuration for scanning Japanese landing permission
     */
    japaneseLandingPermissionConfig?: KeyAble;
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

declare type PluginId = 'barcode' | 'meter' | 'universal_id' | 'japanese_landing_permission' | 'mrz' | 'license_plate' | 'tin' | 'tire_size' | 'commercial_tire_id' | 'tire_make' | 'vin_with_user_guidance' | 'vin' | 'container' | 'ocr' | 'verbund';

export declare type PresetName = 'lpt' | 'lpt_eu' | 'lpt_us' | 'lpt_canada' | 'universalid_mrz' | 'japanese_landing_permission' | 'universalid_dl_at_de' | 'universalid_dl_at_de_strict' | 'universalid_es_it_pt' | 'meter' | 'dialmeter' | 'verbund' | 'vin' | 'vin_with_user_guidance' | 'ocr' | 'qr' | 'barcode_pdf417_parsed' | 'barcode_pdf417' | 'all_barcode_formats' | 'legacy_barcode' | 'container' | 'containerVertical' | 'tire_size' | 'tin' | 'tin_dot' | 'tire_id';

/**
 * A key-value pair used to pass custom variables to the scanning plugin.
 */
declare interface StartVariable {
    key: string;
    value: string | number | boolean;
}

export declare enum State {
    INITIALIZED = "initialized",
    PAUSED = "paused",
    SCANNING = "scanning",
    STOPPED = "stopped",
    DISPOSED = "disposed"
}

declare interface StoredCutout extends ICutout {
    id: string;
    rect: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    cropPadding: {
        x: number;
        y: number;
    };
    cropOffset: {
        x: number;
        y: number;
    };
}

declare type StoredCutouts = {
    [key: string]: StoredCutout;
};

export declare namespace Types {
    export {
        KeyAble,
        ICutout,
        Cutouts,
        ViewConfig,
        UiFeedbackBase,
        UiFeedbackImage,
        UiFeedbackLighting,
        UiFeedbackDistance,
        UiFeedbackFormat,
        UiFeedbackTin,
        UiFeedbackVin,
        UiFeedbackConfig,
        AnylineJSResult,
        FeedbackAnimationStyle,
        LegacyErrorObject,
        CameraAPI,
        StartVariable,
        PluginConfig,
        LockOrientation,
        LockPortraitOrientation,
        LandscapeOrientation,
        AnylineJSParams,
        PresetName,
        PluginId
    }
}

export declare interface UiFeedbackBase {
    presetName: PresetName;
}

export declare type UiFeedbackConfig = UiFeedbackTin | UiFeedbackVin;

declare interface UiFeedbackDistance {
    distance?: {
        imageMoveCloser?: UiFeedbackImage;
        imageMoveBack?: UiFeedbackImage;
    };
}

declare interface UiFeedbackFormat {
    format?: {
        invalidContent: UiFeedbackImage;
    };
}

export declare interface UiFeedbackImage {
    src: string;
    alt?: string;
    /**
     * width of the image, in pixels. smallScreen will be used when display width is less than 600px
     */
    style?: {
        width?: {
            smallScreen?: number;
            largeScreen?: number;
        };
    };
}

declare interface UiFeedbackImageUpdate {
    type: UIFeedbackUpdateType.Image;
    value: UiFeedbackImage | null;
    infoType: InfoMessageType;
    dispatchedAt: Date;
}

declare interface UiFeedbackLighting {
    lighting?: {
        imageTooDark?: UiFeedbackImage;
        imageTooBright?: UiFeedbackImage;
    };
}

export declare const uiFeedbackPresets: {
    tin: UiFeedbackTin;
    vin: UiFeedbackVin;
};

declare class UiFeedbackService {
    private readonly feedbackHandler?;
    constructor(config?: UiFeedbackConfig);
    /**
     *
     * @param message_json
     * @return undefined when no preset is configured for the type of info message
     */
    processMessage(message_json: string): UiFeedbackUpdate | undefined;
}

export declare interface UiFeedbackTin extends UiFeedbackLighting, UiFeedbackDistance {
    presetName: 'tin';
}

/**
 * value is null when the info message shows "acceptable" conditions
 * but UI still needs to be updated - for example, the previous
 * warning needs to be removed
 */
declare type UiFeedbackUpdate = UiFeedbackImageUpdate;

declare enum UIFeedbackUpdateType {
    Image = "image",
    Text = "text",
    Audio = "audio"
}

export declare interface UiFeedbackVin extends UiFeedbackLighting, UiFeedbackDistance, UiFeedbackFormat {
    presetName: 'vin_with_user_guidance';
}

declare interface UiServiceInterface {
    mount(): void;
    unmount(): void;
}

export declare interface ViewConfig {
    outerColor?: string;
    outerAlpha?: number;
    /**
     * Feedback animation style. Defaults to a 'BLINK_ANIMATION' animation.
     */
    feedbackAnimationStyle?: FeedbackAnimationStyle;
    cutouts?: ICutout[];
    feedbackStyle?: string;
    animation?: string;
    uiFeedback?: {
        dynamic?: UiFeedbackConfig;
        static?: {
            instructionText: string;
        };
    };
}

export { }
