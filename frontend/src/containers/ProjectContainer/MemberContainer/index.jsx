import React, { useEffect, useState } from 'react'
import { NavDropdown, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../../Components/CustomComponents';
import AddMembersInProject from '../../../Components/DashboardComponent/ProjectAdmin/AddMembersInProject';
import { AddButton } from '../../../Components/forms/Buttons';
import { getProjectMembersRequest } from '../../../store/Projects/actions';

const mapState = ({ projectMembers, user }) => ({
    members: projectMembers.members,
    project: projectMembers.project,
    isLoading: projectMembers.isLoading,
    project_admin: projectMembers.project_admin,
    user: user.currentUser
})

const MemberContainer = () => {
    const { projectName } = useParams();
    let dispatch = useDispatch();
    const { members, isLoading, project_admin, user } = useSelector(mapState);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(getProjectMembersRequest(projectName))
    }, [projectName])

    
    return (
        <>
            <AddMembersInProject 
                project={projectName} 
                show={show}
                handleClose={() => setShow(false)}
            />
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
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Member</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading&&(
                                members.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.is_project_admin?"Admin":"Member"}</td>
                                            <td>
                                                <NavDropdown title="More" disabled={project_admin!==user.id}>
                                                    <NavDropdown.Item onClick={() => console.log("To be Done")}>Remove from Project</NavDropdown.Item>
                                                </NavDropdown>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </Table>

                </ViewComponent>
            </div>
        </>
    )
}

export default MemberContainer;