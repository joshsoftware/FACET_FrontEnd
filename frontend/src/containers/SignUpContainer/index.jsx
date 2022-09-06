import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Signup from 'Components/Auth/Signup';
import { AuthLayout } from 'Layout';
import { signUpStart } from 'store/User/actions';

const mapState = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

const SignUpContainer = () => {
    let dispatch = useDispatch();

    const { isLoggedIn } = useSelector(mapState);

    const [formData, setFormData] = useState({
        name: "",
        email: "", 
        password: "",
        cpassword: ""
    })

    const handleOnChange = (e) => {
        setFormData(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(signUpStart(formData))
    }
    
    if(isLoggedIn){
        return <Navigate to='/dashboard' /> 
    }
    
    return (
        <>
            <AuthLayout>
                <Signup 
                    data={formData}
                    onchange={handleOnChange}
                    handleSubmit={handleOnSubmit}
                />
                <div className='d-flex flex-column align-items-center'>
                    <Link to='/login' className='pt-3 fst-italic'>Already have an account?</Link>
                </div>
            </AuthLayout>
        </>
    )
}

export default SignUpContainer;