import { AnylineJSParams, FeedbackAnimationStyle } from '../../interface/types';
export interface UiServiceConstructor {
    new (element: Element, param: AnylineJSParams | undefined, feedbackAnimationStyle: FeedbackAnimationStyle): UiServiceInterface;
}
export interface UiServiceInterface {
    mount(): void;
    unmount(): void;
}
