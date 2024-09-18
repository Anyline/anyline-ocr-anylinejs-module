export default AnylineJS;
declare function AnylineJS({ loadingScreen, coverVideo, ..._rest }: {
    [x: string]: any;
    loadingScreen: any;
    coverVideo?: boolean;
}): React.JSX.Element;
declare namespace AnylineJS {
    namespace propTypes {
        let loadingScreen: PropTypes.Requireable<string>;
        let coverVideo: PropTypes.Requireable<boolean>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
