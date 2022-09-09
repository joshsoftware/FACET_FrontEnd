import React from 'react'
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { CustomModal } from '../CustomComponents';
import { CloseButton, SaveButton } from '../forms/Buttons';
import { FormInput } from '../forms/Inputs';

const AddProjectModal = (props) => {
    const { data, onChange, onSubmit, show, handleClose } = props;

    return (
        <CustomModal 
            show={show}
            onClose={handleClose}
            title="Add New Project"
        >
            <Form onSubmit={onSubmit}>
                <CustomModal.Body>
                    <FormInput 
                        label="Name"
                        placeholder="Enter Name"
                        isRequired
                        name="name"
                        value={data.name}
                        onChange={onChange}
                    />
                    <FormInput 
                        label="Description"
                        placeholder="Write Description"
                        name="description"
                        value={data.description}
                        onChange={onChange}
                        type="textarea"
                    />
                </CustomModal.Body>
                <CustomModal.Footer>
                    <CloseButton handleClick={handleClose} />
                    <SaveButton disabled={data.name.length===0} />
                </CustomModal.Footer>
            </Form>
        </CustomModal>
    )
}

export default AddProjectModal;

AddProjectModal.propTypes = {
    data: PropTypes.objectOf(
        PropTypes.string
    ),
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
}
