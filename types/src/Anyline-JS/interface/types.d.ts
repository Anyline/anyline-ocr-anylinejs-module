export interface ViewConfig {
    outerColor?: string;
    outerAlpha?: number;
    cutouts: object[];
}
export interface AnylineJSResult {
    result: any;
    fullImage?: string;
    scanTime: number;
}
export interface LegacyErrorObject {
    code: number;
    message: string;
}
export interface AnylineJSConfig {
    /**
     * estimateMainCamera - [default: true] Flag to disable camera estimation (not recommended)
     */
    estimateMainCamera?: boolean;
    /**
     * loadingScreen - HTML string to replace the default loader (`<div>loading...</div>`)
     */
    loadingScreen?: string;
    /**
     * returnFullImage - [default: false] return the full camera feed image in the result
     */
    returnFullImage?: boolean;
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
     * module - manually set the scan module being used (not recommended, use the top level preset config)
     */
    module?: string;
    scanMode?: string;
    /**
     * minConfidence - percentage of minimal confidence when a result should be return
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
}
/**
 * @typedef AnylineJSparams
 * @type {Object}
 */
export interface AnylineJSParams {
    /**
     * preset - Module preset
     */
    preset?: string;
    /**
     * config - AnylineJS configuration object
     */
    config?: AnylineJSConfig;
    /**
     * viewConfig - Appearance configuration of the cutout
     */
    viewConfig?: ViewConfig;
    /**
     * license - AnylineJS license string
     */
    license: string;
    /**
     * element - HTMLElement where anylineJS should be mounted into
     */
    element: HTMLElement;
    /**
     * debugAnyline - Flag to output more verbose logs
     */
    debugAnyline?: boolean;
    /**
     * anylinePath - Path to anylineJS data assets
     */
    anylinePath: string;
    wasmPath?: string;
}
