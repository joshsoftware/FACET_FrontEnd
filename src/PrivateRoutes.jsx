import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from 'Components/Header';

import { getUserProfileRequest } from 'store/User/actions';

const mapState = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
});

const PrivateRoutes = () => {
    const { isLoggedIn } = useSelector(mapState);
    let dispatch = useDispatch();

    useEffect(() => {
        isLoggedIn && dispatch(getUserProfileRequest());
    }, []);

    return isLoggedIn ? (
        <div>
            <Header />
            <Outlet />
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoutes;
