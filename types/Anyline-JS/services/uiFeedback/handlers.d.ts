import { InfoMessage } from '../../interface/info';
import { UiFeedbackUpdate } from './uiFeedback.service';
import { PresetName, UiFeedbackConfig } from '../../interface/types';
export interface UiFeedbackHandler {
    processInfo(info: InfoMessage): UiFeedbackUpdate | undefined;
}
export declare function getHandler(activePreset?: PresetName, config?: UiFeedbackConfig): UiFeedbackHandler | undefined;
