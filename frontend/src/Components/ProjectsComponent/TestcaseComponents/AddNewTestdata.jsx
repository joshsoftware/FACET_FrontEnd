import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Editor from '../../Editor';
import { DeleteButton, SaveButton } from '../../forms/Buttons';
import { FormInput } from '../../forms/Inputs';
import ExpectedOutcomeTable from '../ExpectedOutcomeTable';
import { addTestdataRequest } from '../../../store/Testdata/actions';
import { toast } from 'react-toastify';

const AddNewTestdata = ({ data, handleClose }) => {
    const [formData, setFormData] = useState(
        {
            testcase: data.id,
            name: '',
            payload: JSON.stringify(data.payload.payload),
            expected_outcome: data.payload.expected_outcome
        } 
    )
    const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);
    let dispatch = useDispatch();

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onPayloadFieldsChange = (res) => {
        if(JSON.parse(res)){
            setFormData(p => ({...p, payload: res}))
        }
    }

    const onExpectedOutcomeFieldsChange = (result) => {
        setFormData({...formData, expected_outcome: result})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.name.length){
            dispatch(addTestdataRequest({...formData, payload: JSON.parse(formData.payload)}));
            handleClose();
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
                    value={formData.name}
                    handlechange={onchange}
                    isRequired
                />
                {console.log(formData)}
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