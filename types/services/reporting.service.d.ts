import ImageService from './image.service';
import platform from 'platform';
export declare type CustomStorage = {
    getItem: Function;
    setItem: Function;
};
declare type Dependencies = {
    store: Storage | CustomStorage;
    platform: typeof platform;
    anylineWorker: any;
    imageService: ImageService;
};
export default class ReportingService {
    private dependencies;
    constructor(dependencies: Dependencies);
    getUuid(): any;
    private generateUuid;
    getPlatformInfo(): {
        name: string;
        version: string;
        product: string;
        manufacturer: string;
        os: string;
    };
    prepareReporting(msg: any): void;
    sendReporting(json: any, url: string, sendAsync: boolean): void;
}
export {};
