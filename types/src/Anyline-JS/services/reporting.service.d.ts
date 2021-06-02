import platform from 'platform';
export declare type CustomStorage = {
    getItem: Function;
    setItem: Function;
};
declare type Dependencies = {
    store: Storage | CustomStorage;
    platform: typeof platform;
    anylineWorker: any;
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
    sendReportingInfo(): void;
}
export {};
