import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ViewComponent } from '../../CustomComponents';
import { FormInput } from '../../forms/Inputs';
import { addEnvironmentsRequest, editEnvironmentsRequest } from '../../../store/Environments/actions';

const AddNewEnvironment = ({ cat, data }) => {
    const { projectName } = useParams();
    const [formData, setFormData] = useState({"project": projectName, "name": "", "url": ""});
    let dispatch = useDispatch();

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(cat==='add'){
            dispatch(addEnvironmentsRequest(formData))
        } else if(cat==='edit') {
            dispatch(editEnvironmentsRequest(formData));
        }
    }

    useEffect(() => {
        if(cat==='edit'){
            setFormData({...formData, "name": data.name, "url": data.url, "id": data.id})
        }
    }, [data])
    

    return (
        <Form onSubmit={handleSubmit} className='w-100'>
            <ViewComponent 
                title="Add New" 
                type="save" 
                onSave={handleSubmit}
            >
                <FormInput 
                    label='Name'
                    placeholder='Name'
                    name='name'
                    value={formData.name}
                    handlechange={onchange}
                    isRequired
                    disabled={cat==='edit'}
                />
                <FormInput 
                    label='URL'
                    placeholder='Enter URL'
                    name='url'
                    value={formData.url}
                    handlechange={onchange}
                    type="url"
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewEnvironment;