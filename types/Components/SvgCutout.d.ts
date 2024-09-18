export default SvgCutout;
declare function SvgCutout({ onAnimationStateChanged, animate, rect, cornerRadius, fill, strokeWidth, inactiveStrokeColor, feedbackStrokeColor, strokeColor, scanning, delay, children, feedbackAnimationStyle, }: {
    onAnimationStateChanged?: () => void;
    animate: any;
    rect: any;
    cornerRadius: any;
    fill: any;
    strokeWidth: any;
    inactiveStrokeColor: any;
    feedbackStrokeColor: any;
    strokeColor: any;
    scanning: any;
    delay: any;
    children: any;
    feedbackAnimationStyle: any;
}): React.JSX.Element;
declare namespace SvgCutout {
    namespace propTypes {
        let onAnimationStateChanged: PropTypes.Requireable<(...args: any[]) => any>;
        let animate: PropTypes.Requireable<boolean>;
        let rect: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            left: PropTypes.Requireable<number>;
            top: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
            width: PropTypes.Requireable<number>;
        }>>>;
        let cornerRadius: PropTypes.Requireable<number>;
        let fill: PropTypes.Requireable<string>;
        let strokeWidth: PropTypes.Requireable<number>;
        let inactiveStrokeColor: PropTypes.Requireable<string>;
        let feedbackStrokeColor: PropTypes.Requireable<string>;
        let strokeColor: PropTypes.Requireable<string>;
        let scanning: PropTypes.Requireable<boolean>;
        let delay: PropTypes.Requireable<number>;
        let children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        let feedbackAnimationStyle: PropTypes.Requireable<string>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
