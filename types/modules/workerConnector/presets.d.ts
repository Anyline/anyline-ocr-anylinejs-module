import { PluginConfig, ViewConfig, AnylineJSParams, PluginId } from './types';
declare function mergePresetToConfigs(params: AnylineJSParams): {
    viewConfig: ViewConfig;
    config: PluginConfig;
    pluginId?: PluginId;
};
export default mergePresetToConfigs;
