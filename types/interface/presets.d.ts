export default mergePresetToConfigs;
declare function mergePresetToConfigs(config: {}, viewConfig: {}, preset: any): {
    viewConfig: {};
    config: {};
} | {
    viewConfig: {
        cutouts: any[];
    };
    config: {};
};
