import React, { useEffect, useState } from 'react';
import { CustomModal } from '../../../CustomComponents';
import { SaveButton } from '../../../forms/Buttons';
import {
    FormInput,
    FormSelect
} from '../../../forms/Inputs';

const AddValueField = ({ data, onSuccess }) => {
    const [formData, setFormData] = useState({value: ""});

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onSave = () => {
        onSuccess(formData)
    }

    useEffect(() => {
        setFormData({...formData, value: data.value})
    }, [data])
    

    return (
        <>
            <CustomModal.Body>
                {data.type==='boolean'?(
                    <FormSelect 
                        label="Value"
                        name="value"
                        options={[['true', 'True'], ['false', 'False']]}
                        value={formData.value}
                        handlechange={onchange}
                        isRequired
                    />
                ):(
                    <FormInput 
                        label="Value"
                        type={data.type}
                        name="value"
                        value={formData.value}
                        handlechange={onchange}
                        isRequired
                    />
                )}
            </CustomModal.Body>
            <CustomModal.Footer>
                <SaveButton 
                    disabled={formData.value.length===0}
                    handleClick={onSave}
                />
            </CustomModal.Footer>
        </>
    )
}

export default AddValueField;