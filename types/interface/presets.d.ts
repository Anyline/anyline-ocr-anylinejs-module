import { PluginConfig, ViewConfig } from './types';
declare function mergePresetToConfigs(config: PluginConfig | undefined, viewConfig: ViewConfig | undefined, preset: string | undefined): {
    viewConfig: {
        outerColor?: string;
        outerAlpha?: number;
        feedbackAnimationStyle?: import("./types").FeedbackAnimationStyle;
        cutouts: import("./types").KeyAble[];
        feedbackStyle?: string;
    };
    config: PluginConfig;
};
export default mergePresetToConfigs;
