import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AccountTypeCard from "Components/Auth/Signup/AccountTypeCard";
import AuthLayout from "Layout/AuthLayout";
import JSONForm from "Components/JSONForm";
import Button from "Components/forms/Button";

import { clearUserState, signUpRequest } from "store/User/actions";

import { ACCOUNT_TYPES } from "constants/authConstants";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "constants/routeConstants";
import { EMAIL_NOT_VALID } from "constants/userMessagesConstants";
import { EMAIL_REGEX } from "constants/appConstants";

const mapState = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  isSignUpSuccess: user.isSignUpSuccess,
  isLoading: user.isLoading,
});

const initialValues = {
  name: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUpContainer = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isSignUpSuccess, isLoading } = useSelector(mapState);

  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    return () => dispatch(clearUserState());
  }, []);

  // on submit sign up form
  const handleOnSubmit = (values) => {
    const { name, username, email, password } = values;
    const payload = {
      name,
      username,
      email,
      password,
      account_type: accountType,
    };
    dispatch(signUpRequest(payload));
  };

  // set account type when user click on accountTypeCard
  const handleSelectAccountType = useCallback(
    (newValue) => setAccountType(newValue),
    []
  );

  // If user already loggedin then redirect to dashboard screen
  if (isLoggedIn) {
    return <Navigate to={DASHBOARD_ROUTE} />;
  }

  // If signup success redirect user to login screen
  if (isSignUpSuccess) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  const signupTitle =
    accountType === "organization"
      ? "Create an enterprise account"
      : "Create an individual account";

  const signupSchema = [
    {
      label: "Name",
      type: "text",
      name: "name",
      required: true,
      placeholder: "Enter name",
      validations: {
        family: "string",
        min: 2,
      },
    },
    {
      label: "Username",
      type: "text",
      name: "username",
      required: true,
      placeholder: "Enter username",
      validations: {
        family: "string",
        min: 4,
      },
    },
    {
      label: "Email",
      type: "email",
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
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      required: true,
      placeholder: "Re-enter password",
      validations: {
        family: "string",
        min: 4,
        oneOf: [["schema.password"], "Password not matched"],
      },
    },
    {
      component: (
        <Button
          type="submit"
          iconType="save"
          className="w-100"
          isLoading={isLoading}
        >
          Signup
        </Button>
      ),
    },
  ];

  return (
    <AuthLayout>
      {!accountType ? (
        <>
          <h5 className="fw-bold">Select Account Type</h5>
          <Row className="py-4">
            {ACCOUNT_TYPES.map((item, index) => (
              <Col key={index}>
                <AccountTypeCard
                  data={item}
                  accountType={accountType}
                  setAccountType={handleSelectAccountType}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h5 className="fw-bold">{signupTitle}</h5>
          <JSONForm
            schema={signupSchema}
            onSubmit={handleOnSubmit}
            defaultValues={initialValues}
          />
        </>
      )}
      <div className="d-flex flex-column align-items-center">
        <span className="pt-3">
          Already have an account?
          <Link to={LOGIN_ROUTE} className="ps-1 fst-italic">
            Login
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
};

export default SignUpContainer;
