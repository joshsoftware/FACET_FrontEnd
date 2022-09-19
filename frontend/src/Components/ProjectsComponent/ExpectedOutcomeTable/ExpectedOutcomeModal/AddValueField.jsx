import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { CustomModal } from 'Components/CustomComponents';
import { SaveButton } from 'Components/forms/Buttons';
import {
    FormInput,
    FormSelect
} from 'Components/forms/Inputs';
import { BOOLEAN_SELECT_OPTION } from 'constants/appConstants';

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
    
    console.log(data.type.toLowerCase())

    return (
        <>
            <CustomModal.Body>
                {data.type==='boolean'?(
                    <FormSelect 
                        label="Value"
                        name="value"
                        options={BOOLEAN_SELECT_OPTION}
                        value={formData.value}
                        handlechange={onchange}
                        isRequired
                    />
                ):(
                    <FormInput 
                        label="Value"
                        type={data.type.toLowerCase()==='datetime'?'datetime-local':data.type.toLowerCase()}
                        name="value"
                        value={formData.value}
                        onChange={onchange}
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

AddValueField.propTypes = {
    data: PropTypes.object,
    onSuccess: PropTypes.func
}
