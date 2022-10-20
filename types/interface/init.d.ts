import { AnylineJS } from './api';
import { AnylineJSParams } from './types';
export declare function getAnylineWorker({ mock, params, }: {
    mock: boolean;
    params: AnylineJSParams;
}): {
    onLoaded: () => void;
    onPreloaded: () => void;
    onImagereq: () => void;
    terminate: () => void;
    launch: () => void;
    sendImage: (image: any) => void;
    sendMessage: (msg: any) => void;
    passReportingPayload: (params: any) => void;
} | {
    anylineWorkerInstance: Worker;
    terminate: () => any;
    sendMessage: (msg: any) => void;
};
export declare const init: (params: AnylineJSParams) => AnylineJS;
