import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ViewComponent } from '../../CustomComponents';
import { FormInput } from '../../forms/Inputs';
import { addHeadersRequest, editHeadersRequest } from '../../../store/Headers/actions';
import KeyValuePairsFormField from '../../forms/KeyValuePairsFormField';

const AddNewHeader = ({ cat, data }) => {
    const { projectName } = useParams();
    const [formData, setFormData] = useState({"project": projectName, "name": "", "header": {}});
    let dispatch = useDispatch();

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(cat==='add') {
            dispatch(addHeadersRequest(formData))
        } else {
            dispatch(editHeadersRequest(formData))
        }
    }
    
    const onHeaderFieldsChange = (result) => {
        setFormData({...formData, "header": result});
    }

    useEffect(() => {
        if(cat==='edit'){
            setFormData({...formData, "name": data.name, "header": data.header, "id": data.id})
        }
    }, [data])

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
                    disabled={cat==='edit'}
                />
                <FormInput 
                    label='Header'
                    element={
                        <KeyValuePairsFormField 
                            data={formData.header} 
                            setData={onHeaderFieldsChange} 
                        />}
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewHeader;