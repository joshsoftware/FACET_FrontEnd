import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ViewComponent } from '../../CustomComponents';
import FormInput from '../../forms/FormInput';
import { addPayloadsRequest } from '../../../store/Payloads/actions';
import Editor from '../../Editor';
import ExpectedOutcomeTable from '../ExpectedOutcomeTable';

const AddNewPayload = () => {
    const { projectName } = useParams();
    const [formData, setFormData] = useState({"project": projectName, "name": "", "payload": {"":""}});
    const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);
    let dispatch = useDispatch();

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPayloadsRequest(formData))
    }
    
    const onPayloadFieldsChange = (result) => {
        if(JSON.parse(result)){
            setFormData({...formData, "payload": JSON.parse(result)});
        }
    }

    return (
        <Form onSubmit={handleSubmit} className='w-100'>
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
                            <span>Header<span className='text-danger'>*</span></span>
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
                                onChangeText={onPayloadFieldsChange}
                            />
                        }
                />
                <FormInput 
                    label="Expected Outcome"
                    element={<ExpectedOutcomeTable />}
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewPayload;