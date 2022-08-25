import React from 'react'
import { Nav } from 'react-bootstrap';
import { 
    Box, 
    Calendar4Week, 
    CardChecklist, 
    FileEarmarkText, 
    Gear, 
    House, 
    People, 
    Stickies 
} from 'react-bootstrap-icons';
import { useLocation, useParams } from 'react-router-dom';
import SubNavItem from './SubNavItem';
import './style.css';

const SubNav = () => {
    const location = useLocation();
    let { projectName } = useParams();

    const SubNavItems = [
        {
            name: "Overview",
            path: `/project/${projectName}`,
            icon: <House />
        },
        {
            name: "Templates",
            path: location.pathname,
            icon: <Box />,
            childrens: [
                {
                    name: "Environments",
                    path: `/project/${projectName}/environments`
                },
                {
                    name: "Endpoints",
                    path: `/project/${projectName}/endpoints`
                },
                {
                    name: "Headers",
                    path: `/project/${projectName}/headers`
                },
                {
                    name: "Payloads",
                    path: `/project/${projectName}/payloads`
                }
            ]
        },
        {
            name: "Testcases",
            path: `/project/${projectName}/testcases`,
            icon: <CardChecklist />
        },
        {
            name: "Testsuites",
            path: `/project/${projectName}/testsuites`,
            icon: <Stickies />
        },
        {
            name: "Schedule",
            path: `/project/${projectName}/schedule`,
            icon: <Calendar4Week />
        },
        {
            name: "Reports",
            path: `/project/${projectName}/reports`,
            icon: <FileEarmarkText />
        },
        {
            name: "Team Members",
            path: `/project/${projectName}/members`,
            icon: <People />
        },
        {
            name: "Settings",
            path: `/project/${projectName}/settings`,
            icon: <Gear />
        }
    ]

    return (
        <Nav className="col-md-12 d-none d-md-block sidebar bg-dark text-light overflow-auto">
            <h3 className='sidebar-item text-uppercase text-break'>{projectName}</h3>
            <hr className='mx-2' />
            <div className='sidebar-items-container overflow-auto'>
                {SubNavItems.map((item, index) => {
                    return <SubNavItem key={index} item={item} />
                })}
            </div>
        </Nav>
    )
}

export default SubNav;
