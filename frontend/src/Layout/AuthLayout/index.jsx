import React from 'react';
import './style.css';
import logo from '../../assets/images/logo.png';

const AuthLayout = ({ children }) => {
    return (
        <div className='authLayout'>
            <div className='authContainer'>
                <img 
                    src={logo}
                    width={180}
                />
                <h1>Welcome to Facet!</h1>
                <p className='text-muted'>
                    Login to your Facet account
                </p>
                <div className='authChildrens'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;