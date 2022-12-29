import React, { useCallback, useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddNewOrganizationForm from "Components/OrganizationsComponents/onboardOrganization/AddNewOrganizationForm";

import {
  addOrganizationRequest,
  clearOrganizationsState,
} from "store/Organizations/actions";
import { buildRoute } from "utils/helper";

import { INVITE_ORGANIZATION_ROUTE } from "constants/routeConstants";

const initialOrgFormData = { orgName: "", description: "", contactEmail: "" };

const mapState = ({ orgs }) => ({
  isSuccess: orgs.isSuccess,
  organization: orgs.organization,
});

const AddNewOrganization = () => {
  const dispatch = useDispatch();

  const { isSuccess, organization } = useSelector(mapState);

  const [orgFormData, setOrgFormData] = useState(initialOrgFormData);

  // clear organizations state when container renders
  useEffect(() => {
    return () => dispatch(clearOrganizationsState());
  }, []);

  // handles and store the data into state when input changed
  const onFormDataChange = useCallback((e) => {
    const { name, value } = e.target;
    setOrgFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  // handle form submit action
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrganizationRequest(orgFormData));
  };

  // if organization created successfully, navigate to invite page
  if (isSuccess) {
    const navigateTo = buildRoute(INVITE_ORGANIZATION_ROUTE, {
      org: organization.orgName,
    });
    return <Navigate to={navigateTo} />;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Col md={6} className="pt-5 pb-3">
        <h2 className="text-center">Set up your organization</h2>
        <AddNewOrganizationForm
          data={orgFormData}
          onChange={onFormDataChange}
          onSubmit={handleSubmit}
        />
      </Col>
    </Container>
  );
};

export default AddNewOrganization;
