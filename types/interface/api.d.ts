import { UiServiceInterface } from '../services/UI/ui.service.interface';
import ImageService from '../services/image.service';
import { NotStoppedError } from './exceptions';
import { AnylineJSParams, LegacyErrorObject, AnylineJSResult, CameraAPI } from './types';
export declare enum State {
    INITIALIZED = "initialized",
    PAUSED = "paused",
    SCANNING = "scanning",
    STOPPED = "stopped",
    DISPOSED = "disposed"
}
type Dependencies = {
    imageService: ImageService;
    uiService: UiServiceInterface;
    anylineWorker: any;
};
type ImageObject = {
    fullImage: ImageData;
    cutoutImage: ImageData;
};
export declare class AnylineJS {
    private params;
    private dependencies;
    private preloadDone;
    /**
     * Mounts anylineJS into the DOM and exposes api
     * @internal
     * @param {AnylineJSParams} params - AnylineJS parameters
     */
    constructor(params: AnylineJSParams, dependencies: Dependencies);
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
    getFrame(): ImageObject;
    private state;
    private timeBeforeImageSend;
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
    private lockPortrait;
    private lockLandscape;
    handleImageRequest(): Promise<void>;
    private postHooks;
    /**
     * Starts the scan process
     *
     * @returns A promise resolving the video element of the feed
     *
     * @throws PermissionError
     * This exception is thrown if the camera access was denied
     *
     * @throws {@link AnylineError}
     * This exception is thrown if something internally is wrong like licensing issues
     *
     * @throws {@link DisposedError}
     * This exception is thrown if anylineJS is already disposed
     */
    startScanning(): Promise<HTMLVideoElement | null>;
    /**
     * Stops the scan process
     *
     * @throws {@link NotScanningError}
     * This exception is thrown if anylineJS was not started before calling this method
     *
     */
    stopScanning(): void;
    /**
     * Pause the scan process
     *
     * @throws {@link NotScanningError}
     * This exception is thrown if anylineJS was not started before calling this method
     *
     */
    pauseScanning(): void;
    /**
     * Resumes the scan process
     *
     * @throws {@link NotStoppedError}
     * This exception is thrown if anylineJS was not stopped before calling this method
     *
     */
    resumeScanning(): Promise<void | NotStoppedError>;
    /**
     * Disposes anylineJS by unmounting it from the dom and cleaning up
     *
     */
    dispose(): void;
}
export {};
