import React from 'react'
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