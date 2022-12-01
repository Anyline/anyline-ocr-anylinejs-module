export function getSvgPath({ rect, width, height, cornerRadius, strokeWidth, }: {
    rect: any;
    width: any;
    height: any;
    cornerRadius?: number;
    strokeWidth?: number;
}): any;
export default function createMaskService({ canvasEl, outerColor, outerAlpha, rerenderOnAdd, rerenderOnRemove, }: {
    canvasEl: any;
    outerColor?: string;
    outerAlpha?: number;
    rerenderOnAdd?: boolean;
    rerenderOnRemove?: boolean;
}): {
    addCutout: (cutout: any) => void;
    modifyCutout: (cutout: any) => void;
    removeCutout: (cutoutId: any) => void;
    render: () => void;
    setConfig: (newOuterColor: any, newOuterAlpha: any) => void;
    destroy: () => void;
};
