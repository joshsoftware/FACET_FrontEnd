import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AuthLayout } from "Layout";
import JSONForm from "Components/JSONForm";

import { signInRequest } from "store/User/actions";

import { EMAIL_REGEX } from "constants/appConstants";
import {
  ADD_ORGANIZATION_ROUTE,
  DASHBOARD_ROUTE,
  FORGOT_PASSWORD_ROUTE,
} from "constants/routeConstants";
import { EMAIL_NOT_VALID } from "constants/userMessagesConstants";

const initialValues = { email: "", password: "" };

const loginFormSchema = [
  {
    label: "Email",
    type: "text",
    name: "email",
    required: true,
    placeholder: "Enter email",
    validations: {
      family: "string",
      matches: [EMAIL_REGEX, EMAIL_NOT_VALID],
    },
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    required: true,
    placeholder: "Enter password",
    validations: {
      family: "string",
      min: 4,
    },
  },
  {
    wrapperClass: "mb-3 w-100 text-end fs-6 fst-italic",
    component: <Link to={FORGOT_PASSWORD_ROUTE}>Forgot Password?</Link>,
  },
  {
    type: "button",
    label: "login",
    name: "login",
    buttonType: "submit",
    iconType: "save",
    className: "w-100",
  },
];

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
  isLoggedIn: user.isLoggedIn,
  isMemberOfOrg: !!user.currentUser?.user_organization,
  isPersonalAccount: user.isPersonalAccount,
});

const LoginContainer = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isMemberOfOrg, isPersonalAccount, isLoading } =
    useSelector(mapState);

  // on submit login form
  const handleOnSubmit = (value) => {
    dispatch(signInRequest(value));
  };

  // if user is loggedin with organization account type and none of
  // the organization assign to user then navigate to setup organization page
  if (isLoggedIn && !isPersonalAccount && !isMemberOfOrg) {
    return <Navigate to={ADD_ORGANIZATION_ROUTE} />;
  }

  // if user loggedin then navigate to dashboard
  if (isLoggedIn) {
    return <Navigate to={DASHBOARD_ROUTE} />;
  }

  return (
    <AuthLayout>
      <h5 className="fw-bold">Login</h5>
      <JSONForm
        schema={loginFormSchema}
        onSubmit={handleOnSubmit}
        defaultValues={initialValues}
        isLoading={isLoading}
      />
      <div className="d-flex flex-column align-items-center">
        <span className="pt-3">
          New User?
          <Link to="/signup" className="ps-1 fst-italic">
            Create Account
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
};

export default LoginContainer;
