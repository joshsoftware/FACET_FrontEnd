import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { FormInput } from "Components/forms/Inputs";
import { SaveButton } from "Components/forms/Buttons";

import { decodeToken } from "utils/helper";
import { resetPasswordRequest } from "store/User/actions";
import { toastMessage } from "utils/toastMessage";

import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE } from "constants/routeConstants";
import {
  RESET_PASSWORD_INVALID_TOKEN,
  USER_AUTH,
} from "constants/userMessagesConstants";

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
  isSuccess: user.isSuccess,
});

const ResetPasswordForm = ({ token }) => {
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useSelector(mapState);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  // check whether the token is valid or not and user_id is present in token
  const isValidToken = token && decodeToken(token)?.sub?.user_id;

  // if token is invalid redirect user to forgot password route
  if (!isValidToken) {
    toastMessage(RESET_PASSWORD_INVALID_TOKEN, "error");
    return <Navigate to={FORGOT_PASSWORD_ROUTE} />;
  }

  // navigate user to login page if reset password action success
  if (isSuccess) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  const isPasswordMatched =
    formData.newPassword === formData.confirmNewPassword;

  const isSaveButtonDisabled =
    isLoading ||
    !isPasswordMatched ||
    !formData.newPassword ||
    !formData.confirmNewPassword;

  // change action
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // submit action
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordMatched) {
      toastMessage(USER_AUTH.PASSWORD_NOT_MATCHED, "error");
      return;
    }
    const requestData = {
      new_password: formData.newPassword,
      user_token: token,
    };
    dispatch(resetPasswordRequest(requestData));
  };

  return (
    <div>
      <h5 className="fw-bold">Reset Password</h5>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <FormInput
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter New Password"
          isRequired
        />
        <FormInput
          label="Confirm New Password"
          name="confirmNewPassword"
          type="password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          placeholder="Re-enter New Password"
          error={!isPasswordMatched}
          errorMessage={USER_AUTH.PASSWORD_NOT_MATCHED}
          isRequired
        />
        <SaveButton
          type="submit"
          label="Reset password"
          className="w-100"
          disabled={isSaveButtonDisabled}
        />
      </Form>
    </div>
  );
};

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
