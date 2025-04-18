import { ViewPluginConfig } from '../../interface/types';
export declare enum UIFeedbackUpdateType {
    Image = "image",
    Text = "text",
    Audio = "audio"
}
/**
 * value is null when the info message shows "acceptable" conditions
 * but UI still needs to be updated - for example, the previous
 * warning needs to be removed
 */
export interface UiFeedbackUpdate {
    type: UIFeedbackUpdateType;
    value: string | null;
}
export type UiFeedbackStore = {
    [key in UIFeedbackUpdateType]?: UiFeedbackUpdate;
};
export declare class UiFeedbackService {
    private readonly feedbackHandler?;
    constructor(preset?: string, config?: ViewPluginConfig['uiFeedbackConfig']);
    /**
     *
     * @param message_json
     * @return undefined when no preset is configured for the type of info message
     */
    processMessage(message_json: string): UiFeedbackUpdate | undefined;
}
