export function applyCropConfig({ rect, cropPadding, cropOffset, }: {
    rect: any;
    cropPadding?: {
        x: number;
        y: number;
    };
    cropOffset?: {
        x: number;
        y: number;
    };
}): {
    left: any;
    top: any;
    x: any;
    y: any;
    width: number;
    height: number;
};
export function generateCutoutConfig(cutouts: any, parentEl: any): {
    id: any;
    visible: boolean;
    cutoutConfig: any;
    scanFeedback: any;
    rect: {
        width: any;
        height: any;
        left: number;
        top: number;
    };
}[];
