import React, { useCallback, useState } from "react";
import { Image } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AuthLayout } from "Layout";
import Signup from "Components/Auth/Signup";

import { acceptJoinOrgInvitationRequest } from "store/Organizations/actions";

import { DEFAULT_ORG_AVATAR } from "constants/appConstants";
import { SIGNUP_INITIAL_DATA } from "constants/authConstants";
import { DASHBOARD_ROUTE } from "constants/routeConstants";

const mapState = ({ orgs }) => ({
  isSuccess: orgs.isSuccess,
});

// TO-DO: need to verify token which getting from queryStrings and set email field in the state
const AcceptJoinOrgInvitation = () => {
  const dispatch = useDispatch();

  const { org } = useParams();
  const { isSuccess } = useSelector(mapState);

  const [inviteFormData, setInviteFormData] = useState(SIGNUP_INITIAL_DATA);

  // on accept invite form data change
  const onFormDataChange = useCallback((e) => {
    const { name, value } = e.target;
    // Email field cannot be changed here as it requires only invite email
    // and will be already set by fetching from invite token
    if (name !== "email") {
      setInviteFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  }, []);

  // submit accept invitation form and dispatch the api action
  const onAcceptInvitationFormSubmit = (e) => {
    e.preventDefault();
    dispatch(acceptJoinOrgInvitationRequest(inviteFormData));
  };

  // If accept invitation success then it will navigate to dashboard
  if (isSuccess) {
    return <Navigate to={DASHBOARD_ROUTE} />;
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <Image src={DEFAULT_ORG_AVATAR} width={80} height={80} rounded />
        <h5 className="py-2 lh-base">
          You&apos;ve been invited to the <b>{org}</b> organization.
        </h5>
      </div>
      <Signup
        data={inviteFormData}
        onChange={onFormDataChange}
        isEmailFieldDisabled={true}
        onSubmit={onAcceptInvitationFormSubmit}
        buttonText="Create and Join"
      />
    </AuthLayout>
  );
};

export default AcceptJoinOrgInvitation;
