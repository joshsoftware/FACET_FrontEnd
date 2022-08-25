import React from 'react';
import { useSelector } from 'react-redux';
import ProjectBox from './ProjectBox';
import ProjectBoxSkeleton from './ProjectBoxSkeleton';
import './style.css'
import NotFound from '../../assets/images/notFound.svg';


const mapState = ({ projects }) => ({
    projects: projects.projects,
    isLoading: projects.isLoading
})

const ProjectsComponent = () => {
    const { projects, isLoading } = useSelector(mapState);

    return (
        <div className={`${projects.length===0?'w-100':'project-container'} py-4`}>
            {isLoading?(
                <>
                    <ProjectBoxSkeleton />
                    <ProjectBoxSkeleton />
                    <ProjectBoxSkeleton />
                    <ProjectBoxSkeleton />
                </>
            ):(projects.length===0?(
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='text-center'>
                        <img src={NotFound} className="not-found-icon" />
                        <h4>No Projects Found!</h4>
                        <p>You are not assigned to any project.</p>
                    </div>
                </div>
            ):(
                projects.map((e, index) => {
                    return <ProjectBox key={index} data={e} />
                })
            )
            )}
        </div>
    )
}

export default ProjectsComponent;