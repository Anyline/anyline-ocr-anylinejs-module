type Dependencies = {
    mediaDevices: MediaDevices;
};
export default class CameraManager {
    private dependencies;
    private idealDimensionConstraints;
    defaultConstraints: {
        video: {
            width: {
                min: number;
                ideal: number;
                max: number;
            };
            height: {
                min: number;
                ideal: number;
                max: number;
            };
            facingMode: {
                ideal: string;
            };
        };
        audio: boolean;
    };
    activeStream?: MediaStream;
    activeConstraints?: MediaStreamConstraints;
    private currentTryOutIndex?;
    private cameras?;
    constructor(dependencies: Dependencies);
    nextCameraStream(): Promise<MediaStream>;
    setCamera(deviceId: string): Promise<MediaStream>;
    collectCameras(): Promise<MediaDeviceInfo[]>;
    getStream(mediaConstraints?: MediaStreamConstraints): Promise<MediaStream>;
    getOptimalMainStream(): Promise<MediaStream>;
    closeStream(): void;
    setFlashState(state: boolean): Promise<void>;
    refocus(): Promise<void>;
    setFocusDistance(focusDistance: number | undefined): Promise<void>;
}
export {};
