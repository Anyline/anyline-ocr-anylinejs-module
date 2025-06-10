import { InfoMessage, RunSkippedMessage } from '../workerConnector/info';
import { UiFeedbackUpdate } from './uiFeedback.service';
import { PresetName, UiFeedbackConfig } from '../workerConnector/types';
export interface UiFeedbackHandler {
    processMessage(message: InfoMessage | RunSkippedMessage): UiFeedbackUpdate | undefined;
}
export declare function getHandler(activePreset?: PresetName, config?: UiFeedbackConfig): UiFeedbackHandler | undefined;
