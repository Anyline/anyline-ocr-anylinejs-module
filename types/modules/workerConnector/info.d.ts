export declare enum InfoMessageType {
    lighting = "$lightingCondition",
    distance = "distance"
}
export declare enum LightingCondition {
    good = "GOOD",
    dark = "TOODARK",
    bright = "BRIGHT"
}
export declare enum Distance {
    good = "GOOD",
    tooFar = "TOOFAR",
    tooClose = "TOOCLOSE"
}
export declare const infoMessages: {
    lighting: {
        good: {
            name: InfoMessageType;
            value: LightingCondition;
        };
        dark: {
            name: InfoMessageType;
            value: LightingCondition;
        };
        bright: {
            name: InfoMessageType;
            value: LightingCondition;
        };
    };
    distance: {
        good: {
            name: InfoMessageType;
            value: Distance;
        };
        tooFar: {
            name: InfoMessageType;
            value: Distance;
        };
        tooClose: {
            name: InfoMessageType;
            value: Distance;
        };
    };
};
export declare const runSkippedCodes: {
    [key: string]: InfoMessage;
};
export interface InfoMessage {
    name: InfoMessageType;
    value: string;
}
export declare function isInfoMessage(obj: any): obj is InfoMessage;
export interface RunSkippedMessage {
    code: string;
}
export declare function isRunSkippedMessage(obj: any): obj is RunSkippedMessage;
