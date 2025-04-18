import { TinPresets } from '../../interface/types';
import { InfoMessage } from '../../interface/info';
import { UiFeedbackUpdate } from './uiFeedback.service';
import { UiFeedbackHandler } from './handlers';
export declare class TinHandler implements UiFeedbackHandler {
    private readonly presets;
    constructor(presets: TinPresets);
    processInfo(info: InfoMessage): UiFeedbackUpdate | undefined;
    /**
     * @return undefined if no preset is configured
     * null when preset is configured but value is acceptable
     */
    private lightingUpdate;
}
