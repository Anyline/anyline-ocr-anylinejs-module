export declare class ValidationException extends Error {
    name: string;
    message: string;
    code?: ErrorCode;
    errorBody?: {
        [propName: string]: any;
    } | undefined;
    toString: () => string;
    constructor(message: string, code?: ErrorCode | undefined, errorBody?: {
        [propName: string]: any;
    } | undefined);
}
export declare class PacketException extends ValidationException {
    constructor(errorBody?: {
        [propName: string]: any;
    } | undefined);
}
export declare class IndexException extends ValidationException {
    constructor(errorBody?: {
        [propName: string]: any;
    } | undefined);
}
export declare class FetchException extends ValidationException {
    constructor(errorBody?: {
        [propName: string]: any;
    } | undefined);
}
export declare class LoadException extends ValidationException {
    constructor(errorBody?: {
        [propName: string]: any;
    } | undefined);
}
export declare function anyAssert(assertedStatement: boolean, message: any): void;
export declare const error5001 = " *** AnylineJS Error 5001\nLicense error: License is not defined. \nPlease pass a license using the 'license' option when initialising AnylineJS.";
export declare const perfCategories: Map<string, number>;
export declare enum ErrorCode {
    BARBARIAN = 6001,
    BARBARIAN_PACKET = 6002,
    BARBARIAN_INDEX = 6003,
    WASM_FETCH = 7001,
    WASM_LOAD = 7002
}
export declare const trackedMarkers: string[];
