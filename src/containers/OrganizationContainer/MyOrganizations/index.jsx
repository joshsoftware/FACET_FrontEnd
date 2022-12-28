import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MyOrganizationsView from "Components/OrganizationsComponents/MyOrganizations/MyOrganizationsView";

import { getOrganizationsRequest } from "store/Organizations/actions";

const mapState = ({ orgs }) => ({
  isOrgsLoading: orgs.isLoading,
  organizations: orgs.organizations,
});

const MyOrganizations = () => {
  const dispatch = useDispatch();

  const { isOrgsLoading, organizations } = useSelector(mapState);

  // TO-DO: dispatch leave organization
  const leaveOrg = useCallback((org) => {
    console.log(org);
  }, []);

  useEffect(() => {
    dispatch(getOrganizationsRequest());
  }, []);

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="col-md-8">
        <MyOrganizationsView
          isLoading={isOrgsLoading}
          organizations={organizations}
          onLeaveOrg={leaveOrg}
        />
      </div>
    </div>
  );
};

export default MyOrganizations;
