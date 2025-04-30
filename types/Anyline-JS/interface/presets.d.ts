import { PluginConfig, PresetName, ViewConfig } from './types';
declare function mergePresetToConfigs(config: PluginConfig | undefined, viewConfig: ViewConfig | undefined, preset: PresetName | undefined): {
    viewConfig: ViewConfig;
    config: PluginConfig;
};
export default mergePresetToConfigs;
