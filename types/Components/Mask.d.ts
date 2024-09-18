export default Mask;
declare function Mask({ onInit }: {
    onInit?: () => void;
}): React.JSX.Element;
declare namespace Mask {
    namespace propTypes {
        let onInit: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
