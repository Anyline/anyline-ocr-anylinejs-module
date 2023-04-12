export default Cutout;
declare function Cutout({ onEnter, onEntered, onExit, onExited, cutout, resultReceived, feedbackAnimationStyle, }: {
    onEnter?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExited?: () => void;
    cutout: any;
    resultReceived: any;
    feedbackAnimationStyle: any;
}): JSX.Element;
