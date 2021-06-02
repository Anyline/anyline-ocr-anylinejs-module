export declare const errorCodes: {
    WEBCAM_ERROR: number;
    TIMEOUT_ERROR: number;
    LOADING_ERROR: number;
    NOT_INITIALIZED_ERROR: number;
};
export declare const init: ({ preset, config, viewConfig, license, element, debugAnyline, anylinePath, wasmPath, }: {
    preset: any;
    config?: {};
    viewConfig?: {};
    license: any;
    element: any;
    debugAnyline?: boolean;
    anylinePath?: any;
    wasmPath?: any;
}) => {
    onDebug: () => void;
    onResult: ({}: {}) => void;
    onLoad: () => void;
    onFrame: () => void;
    startScanning: () => void;
};
