import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { addAdminsRequest } from '../../../../store/SuperAdmin/actions';
import { getAllUsersRequest } from '../../../../store/User/actions';
import { CustomModal } from '../../../CustomComponents';
import { SaveButton } from '../../../forms/Buttons';

const mapState = ({ getUsers }) => ({
    allUsers: getUsers.users
})

const AddAdminModal = ({ show, handleClose }) => {
    let dispatch = useDispatch();
    const { allUsers } = useSelector(mapState);
    const [options, setOptions] = useState([]);
    const [formData, setFormData] = useState({admin: []})
    useEffect(() => {
        dispatch(getAllUsersRequest({exclude: "admins"}))
    }, [])

    useEffect(() => {
        let options_data = [];
        allUsers.forEach(ele => {
            options_data.push({value: ele.id, label: ele.name})
        })
        setOptions(options_data);
    }, [allUsers])
    
    const onSave = () => {
        dispatch(addAdminsRequest(formData));
        handleClose();
    }    

    return (
        <CustomModal show={show} handleClose={handleClose} title="Add Admins">
            <CustomModal.Body>
                <Select 
                    options={options} 
                    onChange={(e) => setFormData({...formData, admin: e.map(data => data.value)})}
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

export default AddAdminModal;