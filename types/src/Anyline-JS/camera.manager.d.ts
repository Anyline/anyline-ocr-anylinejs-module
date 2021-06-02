export default class CameraManager {
    private navigator;
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
    constructor(navigator: Navigator);
    nextCameraStream(): Promise<MediaStream>;
    collectCameras(): Promise<MediaDeviceInfo[]>;
    getStream(mediaConstraints?: MediaStreamConstraints): Promise<MediaStream>;
    getOptimalMainSteam(): Promise<MediaStream>;
    closeStream(): void;
    setFlashState(state: boolean): Promise<void>;
}
