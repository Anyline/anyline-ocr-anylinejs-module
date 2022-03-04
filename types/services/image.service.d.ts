import CameraManager from './camera.manager';
declare type Dependencies = {
    cameraManager: CameraManager;
};
declare type Params = {
    anylineJScontainerEl: HTMLElement | null;
    scaleDown?: boolean;
    /** @default true */
    mirrorOnDesktop?: boolean;
};
export default class ImageService {
    private params;
    cameraManager: CameraManager;
    isMirrored: boolean;
    private cutoutList;
    private canvas;
    private scalingFactor;
    private videoInstance;
    private videoInstanceVisual;
    private lastFullImage;
    private lastCutoutImage;
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
    /**
     * Can be called to prevent possible memory leaks
     */
    clearMemory(): void;
    getVideoInstance(): HTMLVideoElement;
    applyScalingFactor(data: any): any;
    private cropImage;
    private getCutoutImages;
    getCutout({ scaled }: {
        scaled: Boolean;
    }): {
        x: any;
        y: any;
        width: number;
        height: number;
    };
    getCutoutImage(): any;
    getLastCutoutImage(): string;
    getFullImage(): string;
    getLastFullImage(): string;
}
export {};
