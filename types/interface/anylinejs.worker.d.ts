export default function createAnylineWorker(params: any): {
    anylineWorkerInstance: Worker;
    terminate: () => any;
    sendMessage: (msg: any) => void;
};
