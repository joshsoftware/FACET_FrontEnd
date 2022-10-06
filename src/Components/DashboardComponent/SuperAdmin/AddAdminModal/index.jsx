import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { CustomModal } from 'Components/CustomComponents';
import { SaveButton } from 'Components/forms/Buttons';


const AddAdminModal = (props) => {
    const { 
        allUsers,
        onChange,
        onClose, 
        onSubmit,
        show, 
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
                <Select 
                    options={options} 
                    onChange={onChange}
                    className="py-2"
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
    data: PropTypes.object, 
    onChange: PropTypes.func,
    onClose: PropTypes.func, 
    onSubmit: PropTypes.func,
    show: PropTypes.bool, 
}
