import React, { useState } from 'react'
import { Collapse, Nav } from 'react-bootstrap';
import { Box, Gear, House, People } from 'react-bootstrap-icons';
import './style.css';

const ProjectLayout = () => {
    const [showCollapsedItems, setShowCollapsedItems] = useState(false);

    return (
        <div>
            <Nav className="col-md-12 d-none d-md-block sidebar bg-dark">
                <Nav.Item className='sidebar-item'>
                    <Nav.Link href="/home" className='sidebar-link'>
                        <House /> 
                        <span className='sidebar-link-title'>Overview</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='sidebar-item'>
                    <Nav.Link className='sidebar-link' onClick={() => setShowCollapsedItems(!showCollapsedItems)}>
                        <Box /> 
                        <span className='sidebar-link-title'>Components</span>
                    </Nav.Link>
                    <div className={`collapse ${showCollapsedItems&&'show'} sidebar-collapse`}>
                        <Nav.Link href='/environments'>Environments</Nav.Link>
                        <Nav.Link href='/endpoints'>Endpoints</Nav.Link>
                        <Nav.Link href='/headers'>Headers</Nav.Link>
                        <Nav.Link href='/payloads'>Payloads</Nav.Link>
                        <Nav.Link href='/testcases'>Testcases</Nav.Link>
                        <Nav.Link href='/testsuite'>Testsuites</Nav.Link>
                    </div>
                </Nav.Item>
                <Nav.Item className='sidebar-item'>
                    <Nav.Link className='sidebar-link'>
                        <People /> 
                        <span className='sidebar-link-title'>Members</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='sidebar-item'>
                    <Nav.Link href="/home" className='sidebar-link'>
                        <Gear /> 
                        <span className='sidebar-link-title'>Settings</span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default ProjectLayout;