import ImageSevice from '../services/image.service';
import { AnylineJSParams, LegacyErrorObject, AnylineJSResult } from './types';
export declare enum State {
    INITALIZED = "initalized",
    SCANNING = "scanning",
    STOPPED = "stopped",
    DISPOSED = "disposed"
}
declare type Dependencies = {
    imageService: ImageSevice;
    anylineWorker: any;
};
export declare class AnylineJS {
    private params;
    private dependencies;
    /**
     * Mounts anylineJS into the DOM
     * @internal
     * @param {AnylineJSParams} params - AnylineJS parameters
     */
    constructor(params: AnylineJSParams, dependencies: Dependencies);
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
     * @remarks if returnFullImage flag is set in the config, the result object also contains the full result image
     *
     */
    onResult: (result: AnylineJSResult) => void;
    /**
     * Callback called before a new frame is being processed
     *
     * @params image - current image
     * @params [fullImage] - current full image (if returnFullImage flag is set in the config object)
     *
     */
    onFrame: (image: string, fullImage?: string) => void;
    private state;
    private timeBeforeImageSend;
    private log2debug;
    /**
     * Get current state of AnylineJS
     *
     */
    getState(): State;
    private initalize;
    private postImageToWorker;
    private postHooks;
    private handleError;
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
     */
    startScanning(): Promise<HTMLVideoElement | null>;
    /**
     * Stops the scan process
     *
     */
    stopScanning(): void;
    /**
     * Resumes the scan process
     *
     */
    resumeScanning(): void;
    /**
     * Disposes anylineJS by unmounting it from the dom and cleaning up
     *
     */
    dispose(): void;
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
    setNextCamera(): Promise<void>;
}
export {};
