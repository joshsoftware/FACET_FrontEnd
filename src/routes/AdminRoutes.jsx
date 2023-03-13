import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "Layout/facetAdminLayout";

import { getUserProfileRequest } from "store/User/actions";

import { DASHBOARD_ROUTE } from "constants/routeConstants";

const mapState = ({ user }) => ({
  isFacetAdmin: user.isLoggedIn && user.isFacetAdmin,
});

const AdminRoutes = () => {
  const dispatch = useDispatch();

  const { isFacetAdmin } = useSelector(mapState);

  useEffect(() => {
    isFacetAdmin && dispatch(getUserProfileRequest());
  }, [isFacetAdmin]);

  return isFacetAdmin ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to={DASHBOARD_ROUTE} />
  );
};

export default AdminRoutes;
