import CameraManager from './camera.manager';
type Dependencies = {
    cameraManager: CameraManager;
};
type Params = {
    anylineJScontainerEl: HTMLElement | null;
    scaleDown?: boolean;
    /** @default true */
    mirrorOnDesktop?: boolean;
};
export default class ImageService {
    private params;
    cameraManager: any;
    isMirrored: boolean;
    private cutoutList;
    private canvas;
    scalingFactor: number;
    scalingFactorCutout: number;
    private videoInstance;
    private videoInstanceVisual;
    private lastFullImage;
    private lastCutoutImage;
    cutoutFrame: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    constructor(params: Params, dependencies: Dependencies);
    getCutoutList(): {};
    setNextCamera(): Promise<void>;
    setCamera(deviceId: string): Promise<void>;
    private provideStream;
    mirrorStream(value: boolean): void;
    appendVideoSrc(src: any, srcAttribute?: string): void;
    /**
     * Reappends the last stream. This may help with possible issues when reentering the webapp after sleep
     */
    reappendStream(): Promise<void>;
    appendStream({ mediaConstraints, estimateMainCamera, isRetry, retry, }: {
        mediaConstraints: any;
        estimateMainCamera?: boolean;
        isRetry?: boolean;
        retry?: boolean;
    }): any;
    closeStream(): void;
    /**
     * Can be called to prevent possible memory leaks
     */
    clearMemory(): void;
    getVideoInstance(): HTMLVideoElement;
    applyScalingFactor(data: any): any;
    cutoutBuffer(): ImageData;
    getSubimage(imageData: any, frame: any): ImageData;
    cropImageBuffer({ compression, x, y, width, height, }?: {
        compression?: number;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }): ImageData;
    private getCutoutImages;
    getCutout({ scaled }: {
        scaled: Boolean;
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
    getCutoutImage(): any;
    getLastCutoutImage(): string;
    getFullImage(): string;
    getLastFullImage(): string;
}
export {};
