import React from 'react'
import { AuthLayout } from '../../Layout';
import Login from '../../components/Auth/Login';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const mapState = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

const LoginContainer = () => {
    const { isLoggedIn } = useSelector(mapState);
    
    if(isLoggedIn){
        return <Navigate to='/' /> 
    }
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