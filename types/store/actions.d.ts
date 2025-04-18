import { UiFeedbackUpdate } from '../Anyline-JS/services/uiFeedback/uiFeedback.service';
import { GlobalState } from './global-state';
import { ViewConfig } from '../Anyline-JS/interface/types';
type Action<P> = {
    type: string;
    payload: P;
};
type ActionFn<P> = (payload: P) => Action<P>;
export declare const setConfig: ActionFn<ViewConfig>;
type Mask = GlobalState['mask'];
export declare const setMask: ActionFn<Mask>;
export declare const addCutouts: (payload: unknown) => {
    type: string;
    payload: unknown;
};
export declare const removeCutouts: ActionFn<string[]>;
export declare const updateFeedback: ActionFn<{
    [id: number]: {}[];
}>;
export declare const updateUiFeedback: (payload: UiFeedbackUpdate) => {
    type: string;
    payload: UiFeedbackUpdate;
};
export declare const resetDelay: (payload: unknown) => {
    type: string;
    payload: unknown;
};
export declare const setParentSize: (payload: unknown) => {
    type: string;
    payload: unknown;
};
export declare const startScanning: () => {
    type: string;
};
export declare const stopScanning: (payload: unknown[]) => {
    type: string;
    payload: unknown[];
};
export declare const pauseScanning: () => {
    type: string;
};
export declare const setResultReceived: (payload: boolean) => {
    type: string;
    payload: boolean;
};
export {};
