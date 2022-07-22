import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addEndpointsRequest } from '../../../store/Endpoints/actions';
import { ViewComponent } from '../../CustomComponents';
import { FormInput } from '../../forms/Inputs';

const AddNewEndpoint = () => {
    let dispatch = useDispatch();
    const { projectName } = useParams();
    const [formData, setFormData] = useState({project: projectName, name: "", endpoint: ""});


    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addEndpointsRequest(formData))
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
                    label='Endpoint'
                    placeholder='Endpoint'
                    name='endpoint'
                    value={formData.endpoint}
                    handlechange={onchange}
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewEndpoint;