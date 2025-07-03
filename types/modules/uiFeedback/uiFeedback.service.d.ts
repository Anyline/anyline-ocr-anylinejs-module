/**
 * This module is responsible for managing user guidance.
 * It exposes the UiFeedbackService with primary interface to process the json messages sent from the
 * worker (and forwarded by api.ts). It parses the string and forwards it to the handler for a specific preset,
 * and handler is responsible for determining whether a UI update is necessary based on selected uiFeedbackPreset
 *
 * Which handler is used is decided based on initialization parameters, the mappings for "preset - feedback handler"
 * can be found in handlers.ts
 */
import { InfoMessageType } from '../workerConnector/info';
import { UiFeedbackConfig, UiFeedbackImage } from '../workerConnector/types';
export declare enum UIFeedbackUpdateType {
    Image = "image",
    Text = "text",
    Audio = "audio"
}
export interface UiFeedbackImageUpdate {
    type: UIFeedbackUpdateType.Image;
    value: UiFeedbackImage | null;
    infoType: InfoMessageType;
    dispatchedAt: Date;
}
/**
 * value is null when the info message shows "acceptable" conditions
 * but UI still needs to be updated - for example, the previous
 * warning needs to be removed
 */
export type UiFeedbackUpdate = UiFeedbackImageUpdate;
export type UiFeedbackStore = {
    [key in UIFeedbackUpdateType]?: {
        [infoType: string]: UiFeedbackUpdate;
    };
};
export declare class UiFeedbackService {
    private readonly feedbackHandler?;
    constructor(config?: UiFeedbackConfig);
    /**
     *
     * @param message_json
     * @return undefined when no preset is configured for the type of info message
     */
    processMessage(message_json: string): UiFeedbackUpdate | undefined;
}
