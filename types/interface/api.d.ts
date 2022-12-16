import { UiServiceInterface } from '../services/UI/ui.service.interface';
import ImageSevice from '../services/image.service';
import { AnylineJSParams, LegacyErrorObject, AnylineJSResult, CameraAPI } from './types';
export declare enum State {
    INITALIZED = "initalized",
    PAUSED = "paused",
    SCANNING = "scanning",
    STOPPED = "stopped",
    DISPOSED = "disposed"
}
declare type Dependencies = {
    imageService: ImageSevice;
    uiService: UiServiceInterface;
    anylineWorker: any;
};
export declare class AnylineJS {
    private params;
    private dependencies;
    private preloadDone;
    private startScanningRequested;
    /**
     * Mounts anylineJS into the DOM and exposes api
     * @internal
     * @param {AnylineJSParams} params - AnylineJS parameters
     */
    constructor(params: AnylineJSParams, dependencies: Dependencies);
    preload(): void;
    setFocusDistance(focusDistance: number): void;
    getFaceAuthToken(): Promise<string> | boolean;
    /**
     *
     * Callback called when some (not all) Errors occur
     * @deprecated since version 31.0.0 (Errors should be catched when calling the methods, which provides proper stack-trace)
     *
     * @params error - Error object containing errorCode (.code) and .message
     *
     */
    onError: (error: LegacyErrorObject) => void;
    /**
     *
     * Callback called when scanning is started
     * @deprecated since version 31.0.0 (startScanning is now resolving a promise)
     *
     * @params video - video Element
     *
     */
    onLoad: (video: HTMLVideoElement) => void;
    /**
     * Callback called when a scan yielded in a result
     *
     * @params result - object containing the scanned result and image
     *
     */
    onResult: (result: AnylineJSResult) => void;
    /**
     * Callback called when any Barcodes are detected.
     *
     * @params result - object containing the scanned result and images
     *
     */
    onScannedBarcodes: (result: AnylineJSResult) => void;
    /**
     * Callback called when a scan yielded in a performance log
     *
     * @params perflog - object containing the performance log
     *
     */
    onPerformanceLog: (perflog: any) => void;
    /**
     * Callback called before a new frame is being processed
     *
     * @params image - current image
     * @params fullImage - current full image
     *
     */
    onFrame: (image: string, fullImage: string) => void;
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
    private initalize;
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
    resumeScanning(): Promise<void>;
    /**
     * Disposes anylineJS by unmounting it from the dom and cleaning up
     *
     */
    dispose(): void;
}
export {};
