import React from 'react'

const JSONView = ({ data, ...props }) => {
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