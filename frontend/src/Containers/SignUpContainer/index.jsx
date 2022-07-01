import React from 'react'
import Signup from '../../components/Auth/Signup';
import { AuthLayout } from '../../Layout';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const mapState = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

const SignUpContainer = () => {
    const { isLoggedIn } = useSelector(mapState);
    
    if(isLoggedIn){
        return <Navigate to='/' /> 
    }
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