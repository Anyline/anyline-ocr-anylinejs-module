export default Cutout;
declare function Cutout({ onEnter, onEntered, onExit, onExited, cutout, resultReceived, feedbackAnimationStyle, }: {
    onEnter?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExited?: () => void;
    cutout: any;
    resultReceived: any;
    feedbackAnimationStyle: any;
}): React.JSX.Element;
declare namespace Cutout {
    namespace propTypes {
        let onEnter: PropTypes.Requireable<(...args: any[]) => any>;
        let onEntered: PropTypes.Requireable<(...args: any[]) => any>;
        let onExit: PropTypes.Requireable<(...args: any[]) => any>;
        let onExited: PropTypes.Requireable<(...args: any[]) => any>;
        let cutout: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            rect: PropTypes.Requireable<PropTypes.InferProps<{
                left: PropTypes.Requireable<number>;
                top: PropTypes.Requireable<number>;
                height: PropTypes.Requireable<number>;
                width: PropTypes.Requireable<number>;
            }>>;
            scanFeedback: PropTypes.Requireable<object>;
            cutoutConfig: PropTypes.Requireable<object>;
            id: PropTypes.Requireable<any>;
        }>>>;
        let resultReceived: PropTypes.Requireable<boolean>;
        let feedbackAnimationStyle: PropTypes.Requireable<string>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
