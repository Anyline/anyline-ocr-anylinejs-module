export default ScanFeedback;
declare function ScanFeedback({ config, initialRectStyle, cutoutId, hide, cutoutInfo, isAnimating, }: {
    config?: {
        feedbackStyle: string;
        animation: string;
        elements: any[];
    };
    initialRectStyle: any;
    cutoutId: any;
    hide: any;
    cutoutInfo: any;
    isAnimating: any;
}): React.JSX.Element;
declare namespace ScanFeedback {
    namespace propTypes {
        let config: PropTypes.Requireable<PropTypes.InferProps<{
            feedbackStyle: PropTypes.Requireable<string>;
            animation: PropTypes.Requireable<string>;
            elements: PropTypes.Requireable<any[]>;
        }>>;
        let initialRectStyle: PropTypes.Requireable<object>;
        let cutoutId: PropTypes.Requireable<any>;
        let hide: PropTypes.Requireable<boolean>;
        let cutoutInfo: PropTypes.Requireable<object>;
        let isAnimating: PropTypes.Requireable<boolean>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
