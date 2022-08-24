import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeProjectNameBox } from '../../../Components/ProjectsComponent/SettingsComponent';
import { getOneProjectRequest, updateProjectNameRequest } from '../../../store/Projects/actions';

const mapState = ({ user, projects }) => ({
    user: user.currentUser,
    currentProject: projects.oneProject,
    isLoading: projects.isLoading,
    isSuccess: projects.isSuccess
})

const SettingsContainer = () => {
    const { projectName } = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const { user, currentProject, isLoading, isSuccess } = useSelector(mapState);

    const [changeNameFormData, setChangeNameFormData] = useState({project: "", newProjName: ""});
    
    useEffect(() => {
        dispatch(getOneProjectRequest({project: projectName}))
    }, [projectName])
    
    useEffect(() => {
        if(currentProject.name){
            setChangeNameFormData(prevState => ({
                ...prevState,
                project: currentProject.name,
                newProjName: currentProject.name
            }))
        }
    }, [currentProject])
    
    const onChangeName = (e) => {
        setChangeNameFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmitChangeNameForm = (e) => {
        e.preventDefault();
        dispatch(updateProjectNameRequest(changeNameFormData))
    }

    useEffect(() => {
        if(isSuccess && changeNameFormData.newProjName.length!==0) {
            navigate(`/project/${changeNameFormData.newProjName}/settings`);
        }
    }, [isSuccess])
    
    console.log(isLoading, currentProject)
    
    return (
        <div className='px-5 py-4 w-100'>
            <div className={`py-3 d-flex justify-content-between`}>
                <div>
                    <div className='text-primary'>
                        <span 
                            className='d-flex align-items-center'
                            style={{cursor: 'pointer', width: 'fit-content'}}
                            onClick={()  => navigate(-1)}
                        >
                            <ArrowLeft />
                            Back
                        </span>
                    </div>
                    <h2>Settings</h2>
                </div>

            </div>

            {!isLoading&&(
                <ChangeProjectNameBox 
                    user={user}
                    project={currentProject}
                    formData={changeNameFormData}
                    onchange={onChangeName}
                    handleSubmit={handleSubmitChangeNameForm}
                />
            )}
        </div>
    )
}

export default SettingsContainer;