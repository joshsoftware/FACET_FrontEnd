import React from 'react'
import { Container } from 'react-bootstrap';

const DashboardLayout = ({ children }) => {
    return (
        <Container className='my-4'>
            {children}
        </Container>
    )
}

export default DashboardLayout;