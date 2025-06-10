import CameraManager from './camera.manager';
import { StoredCutouts } from '../store/global-state';
type Dependencies = {
    cameraManager: CameraManager;
};
type Params = {
    anylineJScontainerEl: HTMLElement | null;
    scaleDown?: boolean;
    /** @default true */
    mirrorOnDesktop?: boolean;
};
type CutoutFrame = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export default class ImageService {
    private readonly params;
    cameraManager: any;
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
    constructor(params: Params, dependencies: Dependencies);
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
    getVideoInstanceVisual(): HTMLVideoElement;
    applyScalingFactor(data: {
        points: number[][];
    }[]): {
        points: number[][];
    }[];
    cutoutBuffer(): ImageData;
    getSubimage(imageData: ImageData, frame: CutoutFrame): ImageData | undefined;
    cropImageBuffer({ x, y, width, height }?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
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
    getCutoutImage(): ImageData;
    getLastCutoutImage(): ImageData;
    getFullImage(): string;
    getLastFullImage(): string;
}
export {};
