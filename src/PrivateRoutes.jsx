import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { getUserProfileRequest } from 'store/User/actions';

const mapState = (state) => ({
    isLoggedIn: state.user.isLoggedIn
});

const PrivateRoutes = () => {
    const { isLoggedIn } = useSelector(mapState);
    let dispatch = useDispatch()

    useEffect(() => {
        isLoggedIn && dispatch(getUserProfileRequest());
    }, []);
    

    return isLoggedIn?(
        <div>
            <Outlet />
        </div>
    ):(
        <Navigate to='/login' replace />
    )
}

export default PrivateRoutes;