import { UiFeedbackTin } from '../workerConnector/types';
import { InfoMessage } from '../workerConnector/info';
import { UiFeedbackUpdate } from './uiFeedback.service';
import { UiFeedbackHandler } from './handlers';
export declare class TinHandler implements UiFeedbackHandler {
    private readonly config;
    constructor(config: UiFeedbackTin);
    processMessage(message: InfoMessage): UiFeedbackUpdate | undefined;
    /**
     * @return undefined if no preset is configured
     * null when preset is configured but value is acceptable
     */
    private getImageValue;
    private distanceUpdate;
    private lightingUpdate;
}
