import CameraManager from './camera.manager';
export default class ImageService {
    cameraManager: CameraManager;
    cameraManager: any;
    private cutoutList;
    private canvas;
    private scalingFactor;
    private videoInstance;
    private videoInstanceVisual;
    constructor(cameraManager: CameraManager);
    getCutoutList(): {};
    setNextCamera(): Promise<void>;
    private provideStream;
    appendVideoSrc(src: any, srcAttribute?: string): void;
    appendStream({ mediaConstraints, estimateMainCamera, isRetry, retry, }: {
        mediaConstraints: any;
        estimateMainCamera: any;
        isRetry: any;
        retry?: boolean;
    }): any;
    getVideoInstance(): HTMLVideoElement;
    applyScalingFactor(data: any): any;
    cropImage({ compression, left, top, width, height }: {
        compression?: number;
        left?: number;
        top?: number;
        width?: number;
        height?: number;
    }, { anylineJScontainerEl, scaleDown }: {
        anylineJScontainerEl: any;
        scaleDown: any;
    }): string;
    getCutoutImages({ anylineJScontainerEl, scaleDown }: {
        anylineJScontainerEl: any;
        scaleDown: any;
    }): unknown;
    getFullImage({ anylineJScontainerEl, scaleDown }: {
        anylineJScontainerEl: any;
        scaleDown: any;
    }): string;
}
