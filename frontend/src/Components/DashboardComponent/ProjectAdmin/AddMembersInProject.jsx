import React, { useEffect, useState } from 'react'
import { CustomModal } from '../../CustomComponents';
import Select from 'react-select';
import { getAllUsersRequest } from '../../../store/User/actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SaveButton } from '../../forms/Buttons';
import { addMembersInProjectRequest } from '../../../store/Projects/actions';

const mapState = ({ getUsers }) => ({
    allUsers: getUsers.users
})

function AddMembersInProject({ show, handleClose, project }) {
    let dispatch = useDispatch();
    const { allUsers } = useSelector(mapState);
    const [options, setOptions] = useState([]);
    const [formData, setFormData] = useState({project: project, members: []})
    
    useEffect(() => {
        if(project){
            dispatch(getAllUsersRequest({exclude: "projectMembers", project: project}))
        }
    }, [project])

    useEffect(() => {
        let options_data = [];
        allUsers.forEach(ele => {
            options_data.push({value: ele.id, label: ele.name})
        })
        setOptions(options_data);
    }, [allUsers])

    const onSave = () => {
        dispatch(addMembersInProjectRequest(formData));
        handleClose();
    } 

    return (
        <CustomModal 
            show={show}
            handleClose={handleClose}
            title="Add Members"
        >
            <CustomModal.Body>
                <Select 
                    options={options}
                    onChange={(e) => setFormData({...formData, members: e.map(data => data.value)})}
                    className="py-2"
                    isMulti
                />
                <SaveButton 
                    handleClick={onSave}
                />
            </CustomModal.Body>
        </CustomModal>
    )
}

export default AddMembersInProject;