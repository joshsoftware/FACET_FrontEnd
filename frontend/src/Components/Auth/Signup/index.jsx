import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { SubmitButton } from 'Components/forms/Buttons';
import { FormInput } from 'Components/forms/Inputs';

const Signup = (props) => {
    const { data, onchange, handleSubmit } = props;

    return (
        <Form className='py-2' onSubmit={handleSubmit}>
            <FormInput
                label="Name" 
                isRequired
                type='text'
                name='name'
                value={data.name}
                onChange={onchange}
                placeholder='Enter Name'
            />
            <FormInput
                label="Email" 
                isRequired
                type='email'
                name='email'
                value={data.email}
                onChange={onchange}
                placeholder='Enter Email'
            />
            <FormInput 
                label='Password'
                isRequired
                type='password'
                name='password'
                value={data.password}
                onChange={onchange}
                placeholder='Enter Password'
            />
            <FormInput 
                label='Confirm Password'
                isRequired
                type='password'
                name='cpassword'
                value={data.cpassword}
                onChange={onchange}
                placeholder='Enter Password'
            />
            <SubmitButton
                label='SignUp'
                className='w-100'
                disabled={data.email.length===0 || data.password.length===0}
            />
        </Form>
    )
}

export default Signup;

Signup.propTypes = {
    data: PropTypes.object,
    onchange: PropTypes.func,
    handleSubmit: PropTypes.func
}
