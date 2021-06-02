import CameraManager from './camera.manager';
import { DOMElement } from 'react';
declare type Dependencies = {
    cameraManager: CameraManager;
};
declare type Params = {
    anylineJScontainerEl: DOMElement;
    scaleDown?: boolean;
};
export default class ImageService {
    private params;
    cameraManager: CameraManager;
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
    private cropImage;
    private getCutoutImages;
    getCutoutImage(): any;
    getLastCutoutImage(): string;
    getFullImage(): string;
    getLastFullImage(): string;
}
export {};
