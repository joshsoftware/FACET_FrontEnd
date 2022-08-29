import React from 'react'
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const BadgeComponent = (
    {
        bg,
        label,
        className
    }
) => {
    return (
        <Badge bg={bg} className={className}>
            {label}
        </Badge>
    )
}

export default BadgeComponent;

BadgeComponent.propTypes = {
    bg: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string
}