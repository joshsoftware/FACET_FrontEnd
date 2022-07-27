import React from 'react'
import Select from 'react-select';
import { CustomModal } from '../../../CustomComponents';
import { SaveButton } from '../../../forms/Buttons';

const AddAdminModal = ({ show }) => {
    return (
        <CustomModal show={show} title="Add Admins">
            <CustomModal.Body>
                <Select 
                    options={[]} 
                    className="py-2"
                    isMulti
                />
                <SaveButton />
            </CustomModal.Body>
        </CustomModal>
    )
}

export default AddAdminModal;