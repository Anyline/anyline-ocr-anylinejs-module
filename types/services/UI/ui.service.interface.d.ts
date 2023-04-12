import { AnylineJSConfig, FeedbackAnimationStyle } from '../../interface/types';
export interface UiServiceConstructor {
    new (element: Element, config: AnylineJSConfig | undefined, feedbackAnimationStyle: FeedbackAnimationStyle): UiServiceInterface;
}
export interface UiServiceInterface {
    mount(): void;
    unmount(): void;
}
