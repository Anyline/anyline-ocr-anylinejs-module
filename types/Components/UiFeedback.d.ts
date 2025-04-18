import React from 'react';
import { GlobalState, StoredCutout } from "../store/global-state";
interface UiFeedbackProps {
    readonly dynamicFeedback?: ModalSettings;
    readonly staticFeedback?: ModalSettings & {
        textContent: string;
    };
}
export declare function UiFeedbackComponent(props: UiFeedbackProps): React.JSX.Element;
export interface ModalSettings {
    readonly width?: number;
    readonly distanceFromCutout?: number;
}
interface ModalProps extends ModalSettings {
    readonly position: 'top' | 'bottom';
    readonly cutout: StoredCutout;
    readonly parentEl: GlobalState['parent'];
}
export declare function UiFeedbackStatic(props: ModalProps & {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function UiFeedbackDynamic(props: ModalProps): React.JSX.Element;
export {};
