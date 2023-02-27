export default viewConfig;
declare namespace viewConfig {
    const outerColor: string;
    const outerAlpha: number;
    const cutouts: {
        cancelOnResult: boolean;
        cutoutConfig: {
            maxWidthPercent: string;
            ratioFromSize: {
                width: number;
                height: number;
            };
            width: number;
            offset: {
                y: number;
                x: number;
            };
            cropPadding: {
                x: number;
                y: number;
            };
            cropOffset: {
                x: number;
                y: number;
            };
            strokeWidth: number;
            cornerRadius: number;
            strokeColor: string;
            feedbackStrokeColor: string;
        };
        scanFeedback: {
            style: string;
            strokeColor: string;
            fillColor: string;
            strokeWidth: number;
            cornerRadius: number;
            animationDuration: number;
            animation: string;
        };
    }[];
}
