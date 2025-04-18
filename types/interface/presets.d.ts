import { PluginConfig, ViewConfig } from './types';
declare function mergePresetToConfigs(config: PluginConfig | undefined, viewConfig: ViewConfig | undefined, preset: string | undefined): {
    viewConfig: ViewConfig;
    config: PluginConfig;
};
export default mergePresetToConfigs;
