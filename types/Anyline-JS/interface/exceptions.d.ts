export declare class AnylineError extends Error {
    private messageText;
    private code;
    private error;
    constructor(code: number, message: string, error?: Error);
    toString(): string;
}
export declare class MountElementNotDefinedError extends AnylineError {
    constructor(e?: Error);
}
export declare class NotScanningError extends AnylineError {
    constructor(e?: Error);
}
export declare class MountError extends AnylineError {
    constructor(e?: Error);
}
export declare class OnlyAndroidChromeError extends AnylineError {
    constructor(e?: Error);
}
export declare class CameraStreamError extends AnylineError {
    /**
     * Error thrown when the camera stream could not be provided (i.E missing permissions)
     *
     */
    constructor(e?: Error);
}
export declare class DisposedError extends AnylineError {
    constructor(e?: Error);
}
export declare class NotStoppedError extends AnylineError {
    constructor(e?: Error);
}
export declare class MediaDevicesError extends AnylineError {
    constructor(e?: Error);
}
