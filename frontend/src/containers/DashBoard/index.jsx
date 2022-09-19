import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { 
    AddProjectModal, 
    DashboardSubHeader, 
    ProjectsComponent
} from 'Components/DashboardComponent';
import { DashboardLayout } from 'Layout';
import { addProject, fetchProjects } from 'store/Projects/actions';

const INITIAL_PROJECT_FORM_DATA = {
    name: "", 
    description: ""
}

const mapState = ({ user, projects }) => ({
    currentUser: user.currentUser,
    isLoggedIn: user.isLoggedIn,
    projects: projects.projects,
    isProjectsLoading: projects.isLoading
})

const DashBoard = () => {
    let dispatch = useDispatch();
    const { currentUser, isLoggedIn, isProjectsLoading, projects } = useSelector(mapState);

    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [addProjectFormData, setAddProjectFormData] = useState(INITIAL_PROJECT_FORM_DATA)

    const toggleModal = () => {
        setShowAddProjectModal(!showAddProjectModal);
    }

    const onchangeProjectFormData = (e) => {
        setAddProjectFormData(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmitAddProjectForm = (e) => {
        e.preventDefault();
        dispatch(addProject(addProjectFormData));
        toggleModal();
        setAddProjectFormData(INITIAL_PROJECT_FORM_DATA);
    }

    useEffect(() => {
        dispatch(fetchProjects())
    }, [])
    

    return (
        <DashboardLayout>
            <AddProjectModal 
                show={showAddProjectModal} 
                handleClose={toggleModal} 
                data={addProjectFormData}
                onChange={onchangeProjectFormData}
                onSubmit={handleSubmitAddProjectForm}
            />
            <DashboardSubHeader 
                setShowAddProjectModal={toggleModal} 
                user={currentUser}    
                isLoggedIn={isLoggedIn}
            />
            <ProjectsComponent 
                data={projects}
                isLoading={isProjectsLoading}
            />
        </DashboardLayout>
    )
}

export default DashBoard;