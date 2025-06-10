import { UiFeedbackStore } from '../uiFeedback/uiFeedback.service';
import { ICutout } from '../workerConnector/types';
export interface StoredCutout extends ICutout {
    id: string;
    rect: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    cropPadding: {
        x: number;
        y: number;
    };
    cropOffset: {
        x: number;
        y: number;
    };
}
export type StoredCutouts = {
    [key: string]: StoredCutout;
};
export interface GlobalState {
    cutouts: StoredCutouts;
    mask: {
        outerColor?: string;
        outerAlpha?: number;
    };
    feedback: {
        [key: string]: unknown[];
    };
    uiFeedback: UiFeedbackStore;
    parent: {
        width: number;
        height: number;
    };
    result: unknown;
    resultReceived: boolean;
}
