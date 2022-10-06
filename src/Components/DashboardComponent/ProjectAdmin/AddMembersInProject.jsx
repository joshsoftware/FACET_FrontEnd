import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { CustomModal } from 'Components/CustomComponents';
import { SaveButton } from 'Components/forms/Buttons';
import FormSelect from 'Components/forms/Inputs/FormSelect';


const AddMembersInProject = (props) => {
    const { show, handleClose, usersOptions, onchange, handleSubmit, value } = props;

    const [defaultValue, setDefaultValue] = useState([]);

    useEffect(() => {
        setDefaultValue(usersOptions.filter(function(e) {
            return value.includes(e.value)
        }))
    }, [value])
    
    return (
        <CustomModal 
            show={show}
            onClose={handleClose}
            title="Add Members"
        >
            <CustomModal.Body>
                <FormSelect 
                    options={usersOptions}
                    onChange={onchange}
                    className="py-2"
                    value={defaultValue}
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
