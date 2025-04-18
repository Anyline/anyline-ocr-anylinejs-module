export declare enum InfoMessageType {
    lighting = "$lightingCondition"
}
export declare enum LightingCondition {
    good = "GOOD",
    dark = "TOODARK",
    bright = "BRIGHT"
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
};
export interface InfoMessage {
    name: InfoMessageType;
    value: string;
}
export declare function isInfoMessage(obj: any): obj is InfoMessage;
