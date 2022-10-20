export interface ViewConfig {
    outerColor?: string;
    outerAlpha?: number;
    /**
     * Feedback animation style. Defaults to a 'BLINK_ANIMATION' animation.
     */
    feedbackAnimationStyle?: FeedbackAnimationStyle;
    cutouts: object[];
}
export interface AnylineJSResult {
    result: any;
    fullImage: string;
    scanTime: number;
}
/**
 * blink - sets the feedback to a blink animation (DEFAULT)
 * path - sets the feedback to a path animation
 */
export declare type FeedbackAnimationStyle = 'blink' | 'path';
export interface LegacyErrorObject {
    code: number;
    message: string;
}
export interface CameraAPI {
    /**
     * Mirrors the stream (i.E for front-facing cameras)
     *
     * @params state - if the stream should be mirrored or not
     *
     */
    mirrorStream(state: boolean): void;
    /**
     * Sets a specific camera as input
     *
     * @params deviceId - the id of the camera
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
export interface AnylineJSConfig {
    /**
     * use face authentication
     */
    useFaceAuth?: boolean;
    /**
     * estimateMainCamera - [default: true] Flag to disable camera estimation (not recommended)
     */
    estimateMainCamera?: boolean;
    /**
     * loadingScreen - HTML string to replace the default loader (`<div>loading...</div>`)
     */
    loadingScreen?: string;
    /**
     * coverVideo - [default: true] Reverts a letterboxing fix (not recommended to set to false)
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
     * hideFeedback - [default: false] hides the visual feedback while scanning
     */
    hideFeedback?: boolean;
    slowMessageTimeout?: number;
    /**
     * mediaConstraints - overwrite mediaConstraints of the camera feed (i.E to use a certain resolution or a specific camera)
     */
    mediaConstraints?: MediaStreamConstraints;
    /**
     * module - manually set the scan module being used (not recommended, use the top level preset parameter)
     */
    module?: string;
    scanMode?: string;
    /**
     * minConfidence - percentage of minimal confidence when a result should be returned
     */
    minConfidence?: number;
    /**
     * charWhitelist - limit the scope of characters to be scanned (example "ABCDE0123")
     */
    charWhitelist?: string;
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
}
/**
 * @typedef LockOrientation
 * @type {Object}
 */
interface LockPortraitOrientation {
    /**
     * lock - Defines whether or not the screen orientation should be locked to portrait.
     */
    lock: boolean;
    /**
     * element - Element used for fullscreen mode. This is required in order to lock the screen.
     * If no element was set it will default to the element set as root in the configuration (AnylineJSParams).
     */
    element?: HTMLElement;
}
/**
 * @typedef AnylineJSparams
 * @type {Object}
 */
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
     * lockOrientation - If set locks the screen orientation to portrait.
     */
    lockPortraitOrientation?: LockPortraitOrientation;
    /**
     * preset - Module preset
     */
    preset?: string;
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
    config?: AnylineJSConfig;
    /**
     * viewConfig - Appearance configuration of the cutout
     */
    viewConfig?: ViewConfig;
    /**
     * debugAnyline - Flag to output more verbose logs | pass 'screen' to additionally render logging overlay (beta)
     */
    debugAnyline?: boolean | string;
    wasmPath?: string;
}
export {};
