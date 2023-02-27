declare function createFeedbacks(initial?: any[]): {
    getFeedbacks: () => any[];
    set: (newFeedbacks: any) => any[];
    add: (feedback: any) => any[];
};
declare function runFeedbackBenchmark({ setupCutoutsConfig, feedbackCount, }?: {
    setupCutoutsConfig?: {};
    feedbackCount?: number;
}): Promise<void>;
declare function sleep(ms: any): Promise<any>;
