import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { signInStart } from '../../../store/User/actions';
import { SubmitButton } from '../../forms/Buttons';
import FormInput from '../../forms/FormInput';

const Login = () => {
    const [formData, setFormData] = useState({"email": "", "password": ""});
    let dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signInStart(formData))
    }

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    
    return (
        <Form className='py-2' onSubmit={handleSubmit}>
            <FormInput
                label="Email" 
                isRequired
                type='email'
                name='email'
                value={formData.email}
                handlechange={onchange}
                placeholder='Enter Email'
            />
            <FormInput 
                label='Password'
                isRequired
                type='password'
                name='password'
                value={formData.password}
                handlechange={onchange}
                placeholder='Enter Password'
            />
            <SubmitButton 
                label='Login'
                className='w-100'
                disabled={formData.email.length===0 || formData.password.length===0}
            />
        </Form>
    )
}

export default Login;