import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { SubmitButton } from 'Components/forms/Buttons';
import { FormInput } from 'Components/forms/Inputs';

const Login = (props) => {
    const { data, onchange, handleSubmit } = props;
    
    return (
        <Form className='py-2' onSubmit={handleSubmit}>
            <FormInput
                label="Email" 
                isRequired
                type='email'
                name='email'
                value={data.email}
                handlechange={onchange}
                placeholder='Enter Email'
            />
            <FormInput 
                label='Password'
                isRequired
                type='password'
                name='password'
                value={data.password}
                handlechange={onchange}
                placeholder='Enter Password'
            />
            <SubmitButton 
                label='Login'
                className='w-100'
                disabled={data.email.length===0 || data.password.length===0}
            />
        </Form>
    )
}

export default Login;

Login.propTypes = {
    data: PropTypes.object,
    onchange: PropTypes.func,
    handleSubmit: PropTypes.func
}
