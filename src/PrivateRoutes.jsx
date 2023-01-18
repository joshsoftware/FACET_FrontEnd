import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "Components/Header";

import { getOrganizationRequest } from "store/Organizations/actions";
import { getUserProfileRequest } from "store/User/actions";

import { ADD_ORGANIZATION_ROUTE, LOGIN_ROUTE } from "constants/routeConstants";

const mapState = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  organization: user.currentUser?.user_organization,
  isPersonalAccount: user.isPersonalAccount,
});

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoggedIn, organization, isPersonalAccount } = useSelector(mapState);

  useEffect(() => {
    isLoggedIn && dispatch(getUserProfileRequest());
  }, [isLoggedIn]);

  // fetch organization deatils if accountType is not personal
  useEffect(() => {
    organization &&
      !isPersonalAccount &&
      dispatch(getOrganizationRequest({ organization }));
  }, [organization, isPersonalAccount]);

  // check whether if user is loggedin and assigned to org or not
  // if not assigned to any org and current page location is not the ADD_ORGANIZATION_ROUTE
  // then user will redirect to ADD_ORGANIZATION_ROUTE
  if (
    isLoggedIn &&
    organization === null &&
    location.pathname !== ADD_ORGANIZATION_ROUTE
  ) {
    return <Navigate to={ADD_ORGANIZATION_ROUTE} />;
  }

  return isLoggedIn ? (
    <div>
      <Header />
      <Outlet />
    </div>
  ) : (
    <Navigate to={LOGIN_ROUTE} replace />
  );
};

export default PrivateRoutes;
