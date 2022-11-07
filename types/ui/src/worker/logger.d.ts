declare let logger: any;
declare function initializeLogger(): void;
interface PerformanceLog {
    m: string;
    c: number;
    n: string;
    d: number;
    a: number;
}
declare class PerformanceMeasure {
    private performanceLogArray_;
    private perfomanceLogTime_;
    constructor();
    get performanceLogArray(): Array<PerformanceLog>;
    start(identifier: string, marker: string): void;
    stop(identifier: string, marker: string): void;
}
export { logger, initializeLogger, PerformanceMeasure };
