import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import { ViewComponent } from 'Components/CustomComponents';
import AddMembersInProject from 'Components/DashboardComponent/ProjectAdmin/AddMembersInProject';
import { AddButton } from 'Components/forms/Buttons';
import { addMembersInProjectRequest, getProjectMembersRequest, removeMembersInProjectRequest } from 'store/Projects/actions';
import { getAllUsersRequest } from 'store/User/actions';
import TableComponent from 'Components/CustomComponents/TableComponent/index';

const mapState = ({ projectMembers, user, getUsers }) => ({
    members: projectMembers.members,
    project: projectMembers.project,
    isLoading: projectMembers.isLoading,
    project_admin: projectMembers.project_admin,
    user: user.currentUser,
    allUsers: getUsers.users
})

const MemberContainer = () => {
    let dispatch = useDispatch();

    const { projectName } = useParams();
    const { members, isLoading, project_admin, user, allUsers } = useSelector(mapState);
    
    const [show, setShow] = useState(false);
    const [addMemberFormData, setAddMemberFormData] = useState({project: projectName, members: []});
    const [usersOptions, setUsersOptions] = useState([]);

    const toggleModal = () => {
        setShow(!show);
    }
    useEffect(() => {
        dispatch(getProjectMembersRequest({project: projectName}))
    }, [projectName])
    
    useEffect(() => {
        if (projectName) {
            dispatch(getAllUsersRequest({exclude: "projectMembers", project: projectName}))
        }
    }, [projectName])
    
    useEffect(() => {
        let options_data = [];
        if(allUsers){
            allUsers.forEach(ele => {
                options_data.push({value: ele.id, label: ele.name})
            })
        }
        setUsersOptions(options_data);
    }, [allUsers])
    
    const removeMember = (id) => {
        dispatch(removeMembersInProjectRequest({project: projectName, members: [id]}))
    }

    const onchangeMembers = (_name, val) => {
        console.log(val)
        setAddMemberFormData(p => ({
            ...p,
            members: val.map(e => e.value),
        }))
    }
    const onSubmitMemberForm = () => {
        dispatch(addMembersInProjectRequest(addMemberFormData));
        toggleModal();
    }
    
    return (
        <>
            {show&&(
                <AddMembersInProject 
                    show={show}
                    handleClose={toggleModal}
                    usersOptions={usersOptions} 
                    onchange={onchangeMembers}
                    value={addMemberFormData.members}
                    handleSubmit={onSubmitMemberForm}
                />
            )}
            <div className='py-5 w-100'>
                <div className='d-flex justify-content-between align-items-center px-5'>
                    <h3>Team Members</h3>
                    {project_admin===user.id&&(
                        <AddButton 
                            label="Add Member"
                            handleClick={() => setShow(true)}
                        />
                    )}
                </div>
                <ViewComponent
                    disabledHeader
                >
                    <TableComponent striped headings={["#", "Member", "Role", "Actions"]} >
                        {!isLoading&&(
                            members.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            <PersonCircle 
                                                size={24}
                                                className="mx-2"
                                            />
                                            {item.name}
                                        </td>
                                        <td>{item.is_project_admin?"Admin":"Member"}</td>
                                        <td>
                                            <NavDropdown 
                                                title="More" 
                                                disabled={project_admin!==user.id || project_admin===item.id}
                                                style={{lineHeight: "10px"}}
                                            >
                                                <NavDropdown.Item 
                                                    onClick={() => removeMember(item.id)}
                                                    style={{lineHeight: 'initial'}}
                                                >
                                                    Remove from Project
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </TableComponent>
                </ViewComponent>
            </div>
        </>
    )
}

export default MemberContainer;