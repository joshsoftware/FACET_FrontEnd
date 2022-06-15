import React, { useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Box, Gear, House, People } from 'react-bootstrap-icons';
import { Link, useParams } from 'react-router-dom';
import './style.css';

const ProjectLayout = ({ children }) => {
    let { projectName } = useParams();
    const [showCollapsedItems, setShowCollapsedItems] = useState(false);

    return (
        <div className='d-flex flex-row'>
            <Nav className="col-md-12 d-none d-md-block sidebar bg-dark">
                <Nav.Item className='sidebar-item'>
                    <Link to="/" className='nav-link sidebar-link'>
                        <House /> 
                        <span className='sidebar-link-title'>Overview</span>
                    </Link>
                </Nav.Item>
                <Nav.Item className='sidebar-item'>
                    <Link to="" className='nav-link sidebar-link' onClick={() => setShowCollapsedItems(!showCollapsedItems)}>
                        <Box /> 
                        <span className='sidebar-link-title'>Components</span>
                    </Link>
                    <div className={`collapse ${showCollapsedItems&&'show'} sidebar-collapse`}>
                        <Link className='nav-link' to={`/project/${projectName}/environments`}>Environments</Link>
                        <Link className='nav-link' to={`/project/${projectName}/endpoints`}>Endpoints</Link>
                        <Link className='nav-link' to={`/project/${projectName}/headers`}>Headers</Link>
                        <Link className='nav-link' to={`/project/${projectName}/payloads`}>Payloads</Link>
                        <Link className='nav-link' to={`/project/${projectName}/testcases`}>Testcases</Link>
                        <Link className='nav-link' to={`/project/${projectName}/testsuites`}>Testsuites</Link>
                    </div>
                </Nav.Item>
                <Nav.Item className='sidebar-item'>
                    <Link to='' className='nav-link sidebar-link'>
                        <People /> 
                        <span className='sidebar-link-title'>Members</span>
                    </Link>
                </Nav.Item>
                <Nav.Item className='sidebar-item'>
                    <Link to="/" className='nav-link sidebar-link'>
                        <Gear /> 
                        <span className='sidebar-link-title'>Settings</span>
                    </Link>
                </Nav.Item>
            </Nav>
            {children}
        </div>
    )
}

export default ProjectLayout;