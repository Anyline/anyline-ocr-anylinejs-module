export declare enum InfoMessageType {
    lighting = "$lightingCondition",
    distance = "distance",
    format = "$format_invalid_content"
}
export declare enum LightingCondition {
    good = "GOOD",
    dark = "TOODARK",
    bright = "BRIGHT"
}
export declare enum Distance {
    good = "GOOD",// this value does not come from the core, we just have it to have 'off' for storybook
    tooFar = "TOOFAR",
    tooClose = "TOOCLOSE"
}
export declare enum Format {
    invalidContent = "INVALID",
    validContent = "VALID"
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
    imageFormat: {
        invalidContent: {
            name: InfoMessageType;
            value: Format;
        };
    };
};
export declare const runSkippedCodes: {
    [key: number]: InfoMessage;
};
export interface InfoMessage {
    name: InfoMessageType;
    value: string;
}
export declare function isInfoMessage(obj: any): obj is InfoMessage;
export interface RunSkippedMessage {
    code: number;
}
export declare function isRunSkippedMessage(obj: any): obj is RunSkippedMessage;
