import React from 'react';
import { useSelector } from 'react-redux';
import ProjectBox from './ProjectBox';
import ProjectBoxSkeleton from './ProjectBoxSkeleton';
import './style.css'


const mapState = ({ projects }) => ({
    projects: projects.projects,
    isLoading: projects.isLoading
})

const ProjectsComponent = () => {
    const { projects, isLoading } = useSelector(mapState);

    return (
        <div className='project-container py-4'>
            {isLoading?(
                <>
                    <ProjectBoxSkeleton />
                    <ProjectBoxSkeleton />
                    <ProjectBoxSkeleton />
                    <ProjectBoxSkeleton />
                </>
            ):(
                projects.map((e, index) => {
                    return <ProjectBox key={index} data={e} />
                })
            )}
        </div>
    )
}

export default ProjectsComponent;