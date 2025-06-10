export default Polygon;
declare function Polygon({ points, morph, key, useStyles, ...rest }: {
    [x: string]: any;
    points: any;
    morph: any;
    key: any;
    useStyles?: boolean;
}): React.JSX.Element;
declare namespace Polygon {
    namespace propTypes {
        let points: PropTypes.Validator<number[][]>;
        let morph: PropTypes.Requireable<any>;
        let key: PropTypes.Requireable<any>;
        let useStyles: PropTypes.Requireable<boolean>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
