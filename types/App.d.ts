export default App;
declare function App({ parentEl, mediaConstraints, loadingScreen, coverVideo, feedbackAnimationStyle, }: {
    parentEl: any;
    mediaConstraints: any;
    loadingScreen: any;
    coverVideo: any;
    feedbackAnimationStyle: any;
}): React.JSX.Element;
declare namespace App {
    namespace propTypes {
        let parentEl: PropTypes.Validator<object>;
        let mediaConstraints: PropTypes.Requireable<object>;
        let loadingScreen: PropTypes.Requireable<string>;
        let coverVideo: PropTypes.Requireable<boolean>;
        let feedbackAnimationStyle: PropTypes.Requireable<string>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
