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
export declare class LicenseParseError extends AnylineError {
    constructor(e?: Error);
}
export declare class LicenseNotDefinedError extends AnylineError {
    constructor(e?: Error);
}
export declare class InvalidUserGateData extends AnylineError {
    constructor(e?: Error);
}
export declare class ConfigurationNotDefinedError extends AnylineError {
    constructor(e?: Error);
}
export declare class MultipleConfigTypesError extends AnylineError {
    constructor(e?: Error);
}
export declare class NoConfigTypeError extends AnylineError {
    constructor(e?: Error);
}
export declare class InvalidConfigTypeError extends AnylineError {
    constructor(e?: Error);
}
export declare class CutoutConfigNotFoundError extends AnylineError {
    constructor(e?: Error);
}
export declare class PresetNotFoundError extends AnylineError {
    constructor(preset: string, availablePresets: string[], e?: Error);
}
export declare class PreloadNotEnabledError extends AnylineError {
    constructor(e?: Error);
}
export declare class NoActiveStreamError extends AnylineError {
    constructor(e?: Error);
}
export declare class NotMountedError extends AnylineError {
    constructor(e?: Error);
}
export declare class TimeoutError extends AnylineError {
    constructor(e?: Error);
}
export declare class InvalidAlignmentError extends AnylineError {
    constructor(alignment: string, e?: Error);
}
export declare class CutoutRenderError extends AnylineError {
    constructor(e?: Error);
}
export declare class InvalidColorFormatError extends AnylineError {
    constructor(e?: Error);
}
