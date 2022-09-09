import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import logo from 'assets/images/logo.png';

const AuthLayout = ({ children }) => {
    return (
        <div className='authLayout'>
            <div className='authContainer'>
                <img 
                    src={logo}
                    width={180}
                    alt="Facet"
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

AuthLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
}
