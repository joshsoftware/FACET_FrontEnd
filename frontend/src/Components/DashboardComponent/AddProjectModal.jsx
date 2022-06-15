import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProject } from '../../store/Projects/actions';
import { CustomModal } from '../CustomComponents';
import { CloseButton, SaveButton } from '../forms/Buttons';
import FormInput from '../forms/FormInput';

const AddProjectModal = ({ show, handleClose }) => {
    let dispatch = useDispatch();
    const INITIAL_STATE = {"name": "", "description": ""}
    const [formData, setFormData] = useState(INITIAL_STATE)

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProject(formData));
        handleClose();
        setFormData(INITIAL_STATE);
    }

    return (
        <CustomModal 
            show={show}
            handleClose={handleClose}
            title="Add New Project"
        >
            <Form onSubmit={handleSubmit}>
                <CustomModal.Body>
                    <FormInput 
                        label="Name"
                        placeholder="Enter Name"
                        isRequired
                        name="name"
                        value={formData.name}
                        handlechange={onchange}
                    />
                    <FormInput 
                        label="Description"
                        placeholder="Write Description"
                        name="description"
                        value={formData.description}
                        handlechange={onchange}
                        type="textarea"
                    />
                </CustomModal.Body>
                <CustomModal.Footer>
                    <CloseButton handleClick={handleClose} />
                    <SaveButton disabled={formData.name.length===0} />
                </CustomModal.Footer>
            </Form>
        </CustomModal>
    )
}

export default AddProjectModal;