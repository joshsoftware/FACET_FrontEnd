import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProjectBox from './ProjectBox';
import './style.css'


const mapState = ({ projects }) => ({
    projects: projects.projects,
    isLoading: projects.isLoading
})

const ProjectsComponent = () => {
    const { projects, isLoading } = useSelector(mapState);
    
    if(isLoading){
        return <Spinner animation='border' />
    }

    return (
        <div className='project-container py-4'>
            {projects.map((e, index) => {
                return <ProjectBox key={index} data={e} />
            })}
            {projects.map((e, index) => {
                return <ProjectBox key={index} data={e} />
            })}
        </div>
    )
}

export default ProjectsComponent;