import React from 'react';
import PropTypes from 'prop-types';

import { CustomModal } from 'Components/CustomComponents';
import { SaveButton } from 'Components/forms/Buttons';
import FormSelect from 'Components/forms/Inputs/FormSelect';


const AddMembersInProject = (props) => {
    const { show, handleClose, usersOptions, onchange, handleSubmit, value } = props;
    
    return (
        <CustomModal 
            show={show}
            onClose={handleClose}
            title="Add Members"
        >
            <CustomModal.Body>
                <FormSelect 
                    name="members"
                    options={usersOptions}
                    handlechange={onchange}
                    className="py-2"
                    value={value}
                    isMulti
                />
                <SaveButton 
                    handleClick={handleSubmit}
                />
            </CustomModal.Body>
        </CustomModal>
    )
}

export default AddMembersInProject;

AddMembersInProject.propTypes = {
    show: PropTypes.bool, 
    handleClose: PropTypes.func, 
    usersOptions: PropTypes.array,
    onchange: PropTypes.func,
    handleSubmit: PropTypes.func,
    value: PropTypes.array
}
