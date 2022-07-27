import React, { useEffect } from 'react'
import { NavDropdown, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../../Components/CustomComponents';
import { getProjectMembersRequest } from '../../../store/Projects/actions';

const mapState = ({ projectMembers }) => ({
    members: projectMembers.members,
    project: projectMembers.project,
    isLoading: projectMembers.isLoading
})

const MemberContainer = () => {
    const { projectName } = useParams();
    let dispatch = useDispatch();
    const { members, project, isLoading } = useSelector(mapState);

    useEffect(() => {
        dispatch(getProjectMembersRequest(projectName))
    }, [projectName])

    
    return (
        <div className='py-5 w-100'>
            <h3 className='px-5'>Team Members</h3>
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
                                        <td>Member</td>
                                        <td>
                                            <NavDropdown title="More" className='text-dark'>
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
    )
}

export default MemberContainer;