export default VideoStream;
declare function VideoStream({ coverVideo }: {
    coverVideo: any;
}): React.JSX.Element;
declare namespace VideoStream {
    namespace propTypes {
        let coverVideo: PropTypes.Validator<boolean>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
