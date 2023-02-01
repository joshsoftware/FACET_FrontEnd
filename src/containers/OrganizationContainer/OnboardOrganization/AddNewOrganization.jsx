import React, { useCallback, useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddNewOrganizationForm from "Components/OrganizationsComponents/onboardOrganization/AddNewOrganizationForm";

import {
  addOrganizationRequest,
  resetOrganizationsState,
} from "store/Organizations/actions";
import { getUserProfileRequest, signOutRequest } from "store/User/actions";

import {
  DASHBOARD_ROUTE,
  INVITE_ORGANIZATION_ROUTE,
} from "constants/routeConstants";

const initialOrgFormData = { orgName: "", description: "", contactEmail: "" };

const mapState = ({ orgs, user }) => ({
  isSuccess: orgs.isSuccess,
  isOrgAssigned: !!user.currentUser?.user_organization,
  isError: orgs.isError,
});

const AddNewOrganization = () => {
  const dispatch = useDispatch();

  const { isSuccess, isOrgAssigned, isError } = useSelector(mapState);

  const [orgFormData, setOrgFormData] = useState(initialOrgFormData);

  // if user fails to create organization signout user because system deletes the currentUser
  useEffect(() => {
    isError && dispatch(signOutRequest());
  }, [isError]);

  // clear organizations state when container renders
  useEffect(() => {
    return () => dispatch(resetOrganizationsState());
  }, []);

  // fetch user profile when organization created successfully
  useEffect(() => {
    isSuccess && dispatch(getUserProfileRequest());
  }, [isSuccess]);

  // handles and store the data into state when input changed
  const onFormDataChange = useCallback((e) => {
    const { name, value } = e.target;
    setOrgFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  // handle form submit action
  const handleSubmit = (e) => {
    e.preventDefault();
    const { orgName, description, contactEmail } = orgFormData;
    const formData = {
      name: orgName,
      description,
      contact_email_id: contactEmail,
    };
    dispatch(addOrganizationRequest(formData));
  };

  if (isOrgAssigned && isSuccess) {
    return <Navigate to={INVITE_ORGANIZATION_ROUTE} />;
  }

  if (isOrgAssigned) {
    return <Navigate to={DASHBOARD_ROUTE} />;
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
