export default rootReducer;
declare function rootReducer(state: {
    cutouts: {};
    mask: {};
    feedback: {};
    parent: {
        width: number;
        height: number;
    };
    result: any;
    resultReceived: boolean;
}, action: any): {
    cutouts: any;
    mask: {};
    feedback: {};
    parent: {
        width: number;
        height: number;
    };
    result: any;
    resultReceived: boolean;
} | {
    feedback: any;
    cutouts: {};
    mask: {};
    parent: {
        width: number;
        height: number;
    };
    result: any;
    resultReceived: boolean;
} | {
    parent: any;
    cutouts: {};
    mask: {};
    feedback: {};
    result: any;
    resultReceived: boolean;
} | {
    resultReceived: any;
    cutouts: {};
    mask: {};
    feedback: {};
    parent: {
        width: number;
        height: number;
    };
    result: any;
};
