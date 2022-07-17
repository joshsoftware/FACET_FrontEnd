import React, { useState } from 'react'
import { CustomModal } from '../../../CustomComponents';
import SelectFieldType from './SelectFieldType';

const ExpectedOutcomeModal = (
    {
        show,
        onClose,
        data,
        onSave

    }
) => {
    const [modalStep, setModalStep] = useState("selectField");
    const [modalData, setModalData] = useState(data);

    const onSelectField = (val) => {
        setModalData({...modalData, type: val})
        setModalStep("TextField")
    }
    
    const modalBody = () => {
        switch (modalStep) {
            case "selectField":
                return (
                    <SelectFieldType 
                        onSuccess={onSelectField}
                    />
                )
            
            case "TextField":
                return 
        
            default:
                return <SelectFieldType />
        }
    }
    
    return (
        <>
            <CustomModal 
                show={show} 
                handleClose={onClose} 
                centered
                size="lg"
                title="Add Expected Outcome Field"
            >
                {modalBody()}
            </CustomModal>
        </>
    )
}

export default ExpectedOutcomeModal;