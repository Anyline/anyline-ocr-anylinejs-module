import { PresetName, UiFeedbackConfig, UiFeedbackImage } from '../../interface/types';
export declare enum UIFeedbackUpdateType {
    Image = "image",
    Text = "text",
    Audio = "audio"
}
export interface UiFeedbackImageUpdate {
    type: UIFeedbackUpdateType.Image;
    value: UiFeedbackImage | null;
}
/**
 * value is null when the info message shows "acceptable" conditions
 * but UI still needs to be updated - for example, the previous
 * warning needs to be removed
 */
export type UiFeedbackUpdate = UiFeedbackImageUpdate;
export type UiFeedbackStore = {
    [key in UIFeedbackUpdateType]?: UiFeedbackUpdate;
};
export declare class UiFeedbackService {
    private readonly feedbackHandler?;
    constructor(activePreset?: PresetName, config?: UiFeedbackConfig);
    /**
     *
     * @param message_json
     * @return undefined when no preset is configured for the type of info message
     */
    processMessage(message_json: string): UiFeedbackUpdate | undefined;
}
