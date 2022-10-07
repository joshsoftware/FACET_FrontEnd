import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { CustomModal } from 'Components/CustomComponents';
import { SaveButton } from 'Components/forms/Buttons';
import FormSelect from 'Components/forms/Inputs/FormSelect';


const AddAdminModal = (props) => {
    const { 
        allUsers,
        onChange,
        onClose, 
        onSubmit,
        show, 
        data,
    } = props;

    const [options, setOptions] = useState([]);

    useEffect(() => {
        let options_data = [];
        allUsers.forEach(ele => {
            options_data.push({value: ele.id, label: ele.name})
        })
        setOptions(options_data);
    }, [allUsers])
    

    return (
        <CustomModal 
            show={show} 
            onClose={onClose} 
            title="Add Admins"
        >
            <CustomModal.Body>
                <FormSelect 
                    name='members'
                    options={options} 
                    handlechange={onChange}
                    className="py-2"
                    value={data}
                    isMulti
                />
                <SaveButton 
                    handleClick={onSubmit}
                />
            </CustomModal.Body>
        </CustomModal>
    )
}

export default AddAdminModal;

AddAdminModal.propTypes = {
    allUsers: PropTypes.array,
    data: PropTypes.array, 
    onChange: PropTypes.func,
    onClose: PropTypes.func, 
    onSubmit: PropTypes.func,
    show: PropTypes.bool, 
}
