import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ViewComponent } from '../../CustomComponents';
import FormInput from '../../forms/Inputs/FormInput';
import { addPayloadsRequest } from '../../../store/Payloads/actions';
import Editor from '../../Editor';
import ExpectedOutcomeTable from '../ExpectedOutcomeTable';

const INITIAL_VALUE = {
    "project": '', 
    "name": "gh", 
    "payload": {"":""},
    "expected_outcome": [
        {
            name: "status_code",
            type: "number",
            isExact: true,
            value: 200
        }
    ]
}

const AddNewPayload = () => {
    const { projectName } = useParams();
    const [formData, setFormData] = useState(INITIAL_VALUE);
    const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);
    let dispatch = useDispatch();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPayloadsRequest(formData))
    }

    const onchange = (e) => {
        e.preventDefault()
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    
    const onPayloadFieldsChange = (formData, result) => {
        console.log(formData)
        if(JSON.parse(result)){
            setFormData({...formData});
        }
    }
    
    const onExpectedOutcomeFieldsChange = (result) => {
        setFormData({...formData, expected_outcome: result})
    }

    useEffect(() => {
        setFormData({...formData, project: projectName})
    }, [projectName])
    
    return (
        <Form onSubmit={handleSubmit} className='w-100'>
            {console.log(formData)}
            <ViewComponent title="Add New" type="save" onSave={handleSubmit}>
                <FormInput 
                    label='Name'
                    placeholder='Name'
                    name='name'
                    value={formData.name}
                    handlechange={onchange}
                    isRequired
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
                    element={<Editor 
                                json={formData.payload}
                                mode={showPayloadInJsonFormat?"code":"tree"}
                                indentation={4}
                                onChangeText={(res) => onPayloadFieldsChange(formData, res)}
                            />
                        }
                />
                <FormInput 
                    label="Expected Outcome"
                    element={
                        <ExpectedOutcomeTable 
                            data={formData.expected_outcome}
                            onChange={onExpectedOutcomeFieldsChange}
                        />
                    }
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewPayload;