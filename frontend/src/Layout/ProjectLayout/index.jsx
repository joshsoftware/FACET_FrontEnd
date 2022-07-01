import React from 'react';
import { SubNav } from '../../components/ProjectsComponent';

const ProjectLayout = ({ children, ...props }) => {

    return (
        <div className='d-flex flex-row'>
            <SubNav />
            {children}
        </div>
    )
}

export default ProjectLayout;