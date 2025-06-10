import ImageService from '../device/image.service';
type Dependencies = {
    anylineWorker: any;
    imageService: ImageService;
};
export default class ReportingService {
    private dependencies;
    constructor(dependencies: Dependencies);
    prepareReporting(msg: any): void;
    sendReporting(json: any, url: string, sendAsync: boolean): void;
}
export {};
