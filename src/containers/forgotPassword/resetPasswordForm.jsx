import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import JSONForm from "Components/JSONForm";

import { decodeToken } from "utils/helper";
import { resetPasswordRequest } from "store/User/actions";
import { toastMessage } from "utils/toastMessage";

import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE } from "constants/routeConstants";
import {
  RESET_PASSWORD_INVALID_TOKEN,
  USER_AUTH,
} from "constants/userMessagesConstants";

const initialValues = { newPassword: "", confirmNewPassword: "" };

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
  isSuccess: user.isSuccess,
});

const formSchema = [
  {
    name: "newPassword",
    type: "password",
    label: "New Password",
    placeholder: "Enter New Password",
    required: true,
    validations: {
      family: "string",
      min: 4,
    },
  },
  {
    name: "confirmNewPassword",
    type: "password",
    label: "Confirm New Password",
    placeholder: "Re-enter New Password",
    required: true,
    validations: {
      family: "string",
      oneOf: [["schema.newPassword"], USER_AUTH.PASSWORD_NOT_MATCHED],
    },
  },
  {
    type: "button",
    label: "Reset password",
    name: "resetPasswordButton",
    buttonType: "submit",
    variant: "success",
    iconType: "save",
    className: "w-100",
  },
];

const ResetPasswordForm = ({ token }) => {
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useSelector(mapState);

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

  // submit action
  const handleSubmit = (value) => {
    const requestData = {
      new_password: value.newPassword,
      user_token: token,
    };
    dispatch(resetPasswordRequest(requestData));
  };

  return (
    <div>
      <h5 className="fw-bold">Reset Password</h5>
      <JSONForm
        schema={formSchema}
        onSubmit={handleSubmit}
        defaultValues={initialValues}
        isLoading={isLoading}
      />
    </div>
  );
};

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
