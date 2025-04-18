import { InfoMessage } from '../../interface/info';
import { UiFeedbackUpdate } from './uiFeedback.service';
import { UIFeedbackPresets } from '../../interface/types';
export interface UiFeedbackHandler {
    processInfo(info: InfoMessage): UiFeedbackUpdate | undefined;
}
export declare const handlers: {
    [key: string]: {
        presetName: keyof UIFeedbackPresets;
        Handler: new (preset: any) => UiFeedbackHandler;
    };
};
