import React, { useEffect, useState , useCallback} from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ViewComponent } from '../../CustomComponents';
import FormInput from '../../forms/Inputs/FormInput';
import { addPayloadsRequest, editPayloadsRequest } from '../../../store/Payloads/actions';
import Editor from '../../Editor';
import ExpectedOutcomeTable from '../ExpectedOutcomeTable';
import IsValidJson from '../../../utils/IsValidJson';

const INITIAL_VALUE = {
    "project": '', 
    "name": "", 
    "payload": JSON.stringify({"":""}),
    "expected_outcome": [
        {
            name: "status_code",
            type: "number",
            isExact: true,
            value: 200
        }
    ]
}

const AddNewPayload = ({ cat, data }) => {
    const { projectName } = useParams();
    const [formData, setFormData] = useState(INITIAL_VALUE);
    const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);
    let dispatch = useDispatch();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(cat==='add') {
            dispatch(addPayloadsRequest({...formData, payload: JSON.parse(formData.payload)}))
        } else if(cat==='edit') {
            dispatch(editPayloadsRequest({...formData, payload: JSON.parse(formData.payload)}))
        }
    }

    const onchange = (e) => {
        setFormData(p => ({...p, [e.target.name]:e.target.value}))
    }
    
    const onPayloadFieldsChange = (result) => {
        setFormData(p => ({...p, payload: result}));
    };
    
    const onExpectedOutcomeFieldsChange = (result) => {
        setFormData({...formData, expected_outcome: result})
    }

    useEffect(() => {
        setFormData(p => ({...p, project: projectName}))
    }, [projectName])

    useEffect(() => {
        if(cat==='edit') {
            setFormData({...formData, project: projectName, name: data.name, payload: JSON.stringify(data.payload), expected_outcome: data.expected_outcome, id: data.id})
        }
    }, [data])
    
    
    return (
        <Form onSubmit={handleSubmit} className='w-100'>
            <ViewComponent 
                title="Add New" 
                type="save" 
                onSave={handleSubmit}
                onSaveDisabled={formData.name.length===0 || !IsValidJson(formData.payload)}
            >
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
                    element={
                        <>
                            <Editor 
                                text={formData.payload}
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