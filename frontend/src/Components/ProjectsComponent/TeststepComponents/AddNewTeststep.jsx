import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import { FormInput, FormSelect } from 'Components/forms/Inputs';
import { ConvertToSlug } from 'utils';


const AddNewTeststep = (props) => {
    const { cat, data, handleSubmit, onchange, options } = props;

    const onFieldChange = (e) => {
        onchange(e.target.name, e.target.value)
    }

    const onSelectChange = (name, value) => {
        onchange(name, value)
    }    
    
    return (
        <Form className='w-100' onSubmit={handleSubmit}>
            <ViewComponent
                title="Add New"
                type="save"
                onSave={handleSubmit}
            >
                <FormInput 
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={data.name}
                    onChange={onFieldChange}
                    text={data.name.length!==0&&`Your teststep will created as ${ConvertToSlug(data.name)}`}
                    disabled={cat==='edit'}
                    isRequired
                />
                <FormSelect 
                    label="Method"
                    name="method"
                    options={options.methods}
                    value={data.method}
                    handlechange={onSelectChange}
                    isRequired
                />
                <FormSelect 
                    label="Endpoint"
                    name="endpoint_id"
                    options={options.endpoints}
                    value={data.endpoint_id}
                    handlechange={onSelectChange}
                    isRequired
                />
                <FormSelect 
                    label="Header"
                    name="header_id"
                    options={options.headers}
                    value={data.header_id}
                    handlechange={onSelectChange}
                    isRequired
                />
                <FormSelect 
                    label="Payload"
                    name="payload_id"
                    options={options.payloads}
                    value={data.payload_id}
                    handlechange={onSelectChange}
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewTeststep;

AddNewTeststep.propTypes = { 
    cat: PropTypes.string, 
    data: PropTypes.object, 
    handleSubmit: PropTypes.func, 
    onchange: PropTypes.func, 
    options: PropTypes.object
}
