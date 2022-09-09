import React from 'react'
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import { FormInput } from 'Components/forms/Inputs';
import { ConvertToSlug } from 'utils';


const AddNewEnvironment = (props) => {
    const { cat, data, isLoading, onchange, handleSubmit } = props;

    return !isLoading && data && (
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
                    value={data.name}
                    onChange={onchange}
                    isRequired
                    disabled={cat==='edit'}
                    text={data.name.length!==0&&`Your environment will created as ${ConvertToSlug(data.name)}`}
                />
                <FormInput 
                    label='URL'
                    placeholder='Enter URL'
                    name='url'
                    value={data.url}
                    onChange={onchange}
                    type="url"
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewEnvironment;

AddNewEnvironment.propTypes = {
    cat: PropTypes.oneOf(['add', 'edit']),
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    onchange: PropTypes.func,
    handleSubmit: PropTypes.func
}

AddNewEnvironment.defaultProp = {
    data: {
        name: "",
        url: ""
    }
}
