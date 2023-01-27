import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AuthLayout } from "Layout";
import Signup from "Components/Auth/Signup";

import { acceptJoinOrgInvitationRequest } from "store/Organizations/actions";
import { decodeToken } from "utils/helper";
import { toastMessage } from "utils/toastMessage";

import { COMMON_ERROR_MESSAGE } from "constants/userMessagesConstants";
import { LOGIN_ROUTE } from "constants/routeConstants";
import { SIGNUP_INITIAL_DATA } from "constants/authConstants";

const mapState = ({ orgs }) => ({
  isSuccess: orgs.isSuccess,
});

const AcceptJoinOrgInvitation = () => {
  const dispatch = useDispatch();

  const { org } = useParams();
  const { isSuccess } = useSelector(mapState);

  // get token from querystring
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [inviteFormData, setInviteFormData] = useState(SIGNUP_INITIAL_DATA);

  useEffect(() => {
    if (token) {
      const { organization_id: orgId, email_address: email } =
        decodeToken(token)?.sub || {};

      if (orgId && email) {
        setInviteFormData((prevState) => ({ ...prevState, orgId, email }));
      } else {
        toastMessage(COMMON_ERROR_MESSAGE, "error");
      }
    } else {
      toastMessage(COMMON_ERROR_MESSAGE, "error");
    }
  }, [token]);

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
    const { orgId, name, username, email, password } = inviteFormData;
    const payload = { org_id: orgId, name, username, email, password };
    dispatch(acceptJoinOrgInvitationRequest(payload));
  };

  // If accept invitation success then it will navigate to dashboard
  if (isSuccess) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <h5 className="py-2 lh-base">
          {/* &#39; is used for single quotation mark  */}
          You&#39;ve been invited to the <b>{org}</b> organization.
        </h5>
      </div>
      <Signup
        data={inviteFormData}
        onChange={onFormDataChange}
        onSubmit={onAcceptInvitationFormSubmit}
        buttonText="Create and Join"
        isEmailFieldDisabled
      />
    </AuthLayout>
  );
};

export default AcceptJoinOrgInvitation;
