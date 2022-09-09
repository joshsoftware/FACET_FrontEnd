import React from 'react'
import PropTypes from 'prop-types';

const JSONView = (props) => {
    const { data } = props;

    return (
        <textarea 
            rows={5}
            className="w-100"
            value={JSON.stringify(data, null, 4)}
            disabled
            {...props}
        />
    )
}

export default JSONView;

JSONView.propTypes = {
    data: PropTypes.any
}