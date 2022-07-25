import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const mapState = (state) => ({
    isLoggedIn: state.user.isLoggedIn
});

const PrivateRoutes = () => {
    const { isLoggedIn } = useSelector(mapState);

    return isLoggedIn?(
        <div>
            <Outlet />
        </div>
    ):(
        <Navigate to='/login' replace />
    )
}

export default PrivateRoutes;