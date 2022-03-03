/// <reference types="jest" />
import CameraManager from '../../services/camera.manager';
import ImageService from '../../services/image.service';
export declare function getCameraManagerMock(streamMock?: {
    getTracks: jest.Mock<{
        stop: jest.Mock<void, []>;
    }[], []>;
    removeTrack: jest.Mock<void, []>;
}): CameraManager;
export declare function getImageServiceMock(): ImageService;
