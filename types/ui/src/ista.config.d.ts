declare namespace _default {
    export { viewConfig };
    export { config };
}
export default _default;
declare namespace viewConfig {
    const outerColor: string;
    const outerAlpha: number;
    const cutouts: {
        cutoutConfig: {
            maxWidthPercent: string;
            maxHeightPercent: string;
            alignment: string;
            offset: {
                y: number;
            };
            ratioFromSize: {
                width: number;
                height: number;
            };
            width: number;
            strokeWidth: number;
            cornerRadius: number;
            strokeColor: string;
        };
        scanFeedback: {
            style: string;
            strokeColor: string;
            strokeWidth: number;
            cornerRadius: number;
            animation: string;
        };
    }[];
}
declare namespace config {
    const slowMessageTimeout: number;
    const charWhitelist: string;
    const languages: string[];
    const minConfidence: number;
    const module: string;
    const scanMode: string;
}
