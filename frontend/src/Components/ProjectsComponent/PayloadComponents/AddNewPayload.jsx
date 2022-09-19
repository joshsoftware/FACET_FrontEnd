import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import Editor from 'Components/Editor';
import FormInput from 'Components/forms/Inputs/FormInput';
import KeyValuePairsFormField from 'Components/forms/KeyValuePairsFormField';
import { ViewComponent } from 'Components/CustomComponents';
import { ConvertToSlug, IsValidJson } from 'utils';

import ExpectedOutcomeTable from '../ExpectedOutcomeTable';

const AddNewPayload = (props) => {
    const { cat, data, isLoading, onchange, handleSubmit } = props;

    const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);

    const onFormDataChange = (e) => {
        console.log(e.target.name, e.target.value)
        onchange(e.target.name, e.target.value)
    }

    const onPayloadFieldsChange = (result) => {
        onchange('payload', result);
    };

    const onExpectedOutcomeFieldsChange = (result) => {
        onchange('expected_outcome', result);
    }

    const onParameterFieldsChange = (result) => {
        onchange('parameters', result);
    } 

    return !isLoading && data && (
        <Form onSubmit={handleSubmit} className='w-100'>
            <ViewComponent 
                title="Add New" 
                type="save" 
                onSave={handleSubmit}
                onSaveDisabled={data.name.length===0 || !IsValidJson(data.payload)}
            >
                <FormInput 
                    label='Name'
                    placeholder='Name'
                    name='name'
                    value={data.name}
                    onChange={onFormDataChange}
                    disabled={cat==='edit'}
                    isRequired
                    text={data.name.length!==0&&`Your payload will created as ${ConvertToSlug(data.name)}`}
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
                            <span>Payload</span>
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
                                text={data?.payload}
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
            </ViewComponent>
        </Form>
    )
}

export default AddNewPayload;

AddNewPayload.propTypes = {
    cat: PropTypes.oneOf(['add', 'edit']), 
    data: PropTypes.object, 
    isLoading: PropTypes.bool, 
    onchange: PropTypes.func, 
    handleSubmit: PropTypes.func
}
