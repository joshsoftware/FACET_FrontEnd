import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthLayout } from 'Layout';
import Login from 'Components/Auth/Login';
import { signInRequest } from 'store/User/actions';

const mapState = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

const LoginContainer = () => {
    let dispatch = useDispatch();

    const { isLoggedIn } = useSelector(mapState);
    const [formData, setFormData] = useState({email: "", password: ""})
    
    const handleOnChange = (e) => {
        setFormData(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(signInRequest(formData))
    }

    if(isLoggedIn){
        return <Navigate to='/dashboard' /> 
    }

    return (
        <>
            <AuthLayout>
                <Login 
                    data={formData}
                    onchange={handleOnChange}
                    handleSubmit={handleOnSubmit}
                />
                <div className='d-flex flex-column align-items-center'>
                    <Link to='' className='fst-italic'>Forgot Password?</Link>
                    <Link to='/signup' className='pt-3 fst-italic'>New User?</Link>
                </div>
            </AuthLayout>
        </>
    )
}

export default LoginContainer;