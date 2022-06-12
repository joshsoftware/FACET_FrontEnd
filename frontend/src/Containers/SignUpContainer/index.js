import React from 'react'
import Signup from '../../components/Auth/Signup';
import AuthLayout from '../../Layout/AuthLayout';
import { Link } from 'react-router-dom';

const SignUpContainer = () => {
    return (
        <>
            <AuthLayout>
                <Signup />
                <div className='d-flex flex-column align-items-center'>
                    <Link to='/login' className='pt-3 fst-italic'>Already have an account?</Link>
                </div>
            </AuthLayout>
        </>
    )
}

export default SignUpContainer;