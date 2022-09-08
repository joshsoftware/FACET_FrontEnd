import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Editor from 'Components/Editor';
import { DeleteButton, SaveButton } from 'Components/forms/Buttons';
import { FormInput } from 'Components/forms/Inputs';
import ExpectedOutcomeTable from '../ExpectedOutcomeTable';
import KeyValuePairsFormField from 'Components/forms/KeyValuePairsFormField';
import { ConvertToSlug } from 'utils';

const AddNewTestdata = (props) => {
    const { data, onChange, onSubmit, handleClose } = props;

    const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);

    const onchange = (e) => {
        onChange(e.target.name, e.target.value)
    }

    const onPayloadFieldsChange = (res) => {
        if(JSON.parse(res)){
            onChange('payload', res)
        }
    }

    const onParameterFieldsChange = (result) => {
        onChange('parameters', result)
    } 

    const onExpectedOutcomeFieldsChange = (result) => {
        onChange('expected_outcome', result)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.name.length){
            onSubmit(e);
        } else {
            toast.error("Please Fill All Required Fields.")
        }
    }

    return (
        <div className='bg-light border rounded p-3'>
            <Form onSubmit={handleSubmit}>
                <FormInput 
                    label="Name"
                    name="name"
                    placeholder="Name"
                    value={data.name}
                    onChange={onchange}
                    isRequired
                    text={data.name.length!==0&&`Your testdata will created as ${ConvertToSlug(data.name)}`}
                />
                <FormInput 
                    name='parameters'
                    label='Parameters'
                    element={
                        <KeyValuePairsFormField 
                            data={data.parameters} 
                            setData={onParameterFieldsChange} 
                        />}
                />
                <FormInput 
                    label={
                        <div className='d-flex justify-content-between align-items-center'>
                            <span>Payload<span className='text-danger'>*</span></span>
                            <Form.Check 
                                type="switch"
                                label="Json Format"
                                value={showPayloadInJsonFormat}
                                onChange={() => setShowPayloadInJsonFormat(!showPayloadInJsonFormat)}
                            />
                        </div>
                    }
                    element={
                        <>
                            <Editor 
                                text={data.payload}
                                mode={showPayloadInJsonFormat?"code":"tree"}
                                indentation={4}
                                onChangeText={onPayloadFieldsChange}
                            />
                        </>
                        }
                />
                <FormInput 
                    label="Expected Outcome"
                    element={
                        <ExpectedOutcomeTable 
                            data={data.expected_outcome}
                            onchange={onExpectedOutcomeFieldsChange}
                        />
                    }
                    isRequired
                />
                <div className='d-flex justify-content-end'>
                    <DeleteButton 
                        size='sm'
                        className="mx-1"
                        handleClick={handleClose}
                    />
                    <SaveButton 
                        size='sm'
                    />
                </div>
            </Form>
        </div>
    )
}

export default AddNewTestdata;

AddNewTestdata.propTypes = { 
    data: PropTypes.object, 
    onChange: PropTypes.func, 
    onSubmit: PropTypes.func,
    handleClose: PropTypes.func 
}
