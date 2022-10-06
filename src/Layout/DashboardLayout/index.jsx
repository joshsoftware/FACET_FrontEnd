import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const DashboardLayout = ({ children }) => {
    return (
        <Container className='my-4'>
            {children}
        </Container>
    )
}

export default DashboardLayout;

DashboardLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
}
