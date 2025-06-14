import React from 'react';
import { GlobalState, StoredCutout } from "../store/global-state";
import { UiFeedbackImageUpdate, UiFeedbackStore } from "./uiFeedback.service";
export interface UiFeedbackConfig {
    readonly staticFeedback?: FeedbackElementStyle & {
        textContent: string;
    };
    readonly dynamicFeedback?: FeedbackElementStyle;
}
export interface FeedbackElementStyle {
    readonly mobileWidth: number;
    readonly desktopWidth: number;
    readonly distanceFromCutout: number;
}
export declare function UiFeedbackComponent(config: UiFeedbackConfig): React.JSX.Element;
interface GlobalProps {
    readonly cutout: StoredCutout;
    readonly rootElement: GlobalState['parent'];
}
interface FeedbackProps {
    readonly globals: GlobalProps;
    readonly style: FeedbackElementStyle;
    readonly position: 'top' | 'bottom';
}
export declare function FeedbackStatic(props: FeedbackProps & {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function FeedbackDynamic(props: FeedbackProps): React.JSX.Element;
export declare function getImageToDisplay(uiFeedback: UiFeedbackStore): UiFeedbackImageUpdate | undefined;
export {};
