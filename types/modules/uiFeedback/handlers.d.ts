import { InfoMessage } from '../workerConnector/info';
import { UiFeedbackUpdate } from './uiFeedback.service';
import { UiFeedbackConfig } from '../workerConnector/types';
export interface UiFeedbackHandler {
    processMessage(message: InfoMessage): UiFeedbackUpdate | undefined;
}
export declare function getHandler(config?: UiFeedbackConfig): UiFeedbackHandler | undefined;
