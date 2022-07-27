import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
    AddProjectModal, 
    DashboardSubHeader, 
    ProjectsComponent
} from '../../Components/DashboardComponent';
import { DashboardLayout } from '../../Layout';
import { fetchProjects } from '../../store/Projects/actions';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    isLoggedIn: user.isLoggedIn
})

const DashBoard = () => {
    const { currentUser, isLoggedIn } = useSelector(mapState);
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjects())
    }, [])
    
    const handleClose = () => {
        setShowAddProjectModal(false);
    }

    return (
        <DashboardLayout>
            <AddProjectModal show={showAddProjectModal} handleClose={handleClose} />
            <DashboardSubHeader 
                setShowAddProjectModal={() => setShowAddProjectModal(true)} 
                user={currentUser}    
                isLoggedIn={isLoggedIn}
            />
            <ProjectsComponent />
        </DashboardLayout>
    )
}

export default DashBoard;