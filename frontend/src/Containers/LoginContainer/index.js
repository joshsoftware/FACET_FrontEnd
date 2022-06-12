import React from 'react'
import AuthLayout from '../../Layout/AuthLayout';
import Login from '../../components/Auth/Login';
import { Link } from 'react-router-dom';

const LoginContainer = () => {
    return (
        <>
            <AuthLayout>
                <Login />
                <div className='d-flex flex-column align-items-center'>
                    <Link to='' className='fst-italic'>Forgot Password?</Link>
                    <Link to='/signup' className='pt-3 fst-italic'>New User?</Link>
                </div>
            </AuthLayout>
        </>
    )
}

export default LoginContainer;