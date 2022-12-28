import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { AddButton } from "Components/forms/Buttons";
import Loader from "Components/Loader";
import OrganizationRow from "./OrganizationRow";
import ViewComponent from "Components/CustomComponents/ViewComponent";

import { ADD_ORGANIZATION_ROUTE } from "constants/routeConstants";

const MyOrganizationsView = ({ isLoading, organizations, onLeaveOrg }) => {
  const viewComponentRightChildren = (
    <AddButton
      size="sm"
      label="New Organization"
      as={Link}
      to={ADD_ORGANIZATION_ROUTE}
    />
  );

  return (
    <ViewComponent
      title="Organizations"
      disabledBtns
      rightChildrens={viewComponentRightChildren}
    >
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        organizations.map((org, index) => (
          <OrganizationRow key={index} data={org} onLeaveOrg={onLeaveOrg} />
        ))
      )}
    </ViewComponent>
  );
};

MyOrganizationsView.propTypes = {
  isLoading: PropTypes.bool,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLeaveOrg: PropTypes.func.isRequired,
};

export default MyOrganizationsView;
