import React from 'react';
import './cutout-enter-animations.css';
import { StoredCutout } from "../store/global-state";
interface CutoutProps {
    onEnter?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExited?: () => void;
    cutout: StoredCutout;
    resultReceived: boolean;
    feedbackAnimationStyle?: string;
}
declare const Cutout: ({ onEnter, onEntered, onExit, onExited, cutout, resultReceived, feedbackAnimationStyle, }: CutoutProps) => React.JSX.Element;
export default Cutout;
