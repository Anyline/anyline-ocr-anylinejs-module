import { AnylineJSParams } from './types';
interface Message {
    type: string;
}
interface AnylineWorker {
    anylineWorkerInstance: Worker;
    terminate: () => void;
    sendMessage: (msg: Message) => void;
    [key: string]: any;
}
export default function createAnylineWorker(params: AnylineJSParams): AnylineWorker;
export {};
