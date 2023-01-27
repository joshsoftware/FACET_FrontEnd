import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AccountTypeCard from "Components/Auth/Signup/AccountTypeCard";
import AuthLayout from "Layout/AuthLayout";
import Signup from "Components/Auth/Signup";

import { clearUserState, signUpRequest } from "store/User/actions";

import { ACCOUNT_TYPES, SIGNUP_INITIAL_DATA } from "constants/authConstants";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "constants/routeConstants";

const mapState = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  isSignUpSuccess: user.isSignUpSuccess,
});

const SignUpContainer = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isSignUpSuccess } = useSelector(mapState);

  const [formData, setFormData] = useState(SIGNUP_INITIAL_DATA);

  useEffect(() => {
    return () => dispatch(clearUserState());
  }, []);

  // handle formdata change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // on submit sign up form
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, username, email, password, accountType } = formData;
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
  const setAccountType = useCallback(
    (newValue) =>
      setFormData((prevState) => ({ ...prevState, accountType: newValue })),
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

  return (
    <AuthLayout>
      {!formData.accountType ? (
        <>
          <h5 className="fw-bold">Select Account Type</h5>
          <Row className="py-4">
            {ACCOUNT_TYPES.map((item, index) => (
              <Col key={index}>
                <AccountTypeCard
                  data={item}
                  accountType={formData.accountType}
                  setAccountType={setAccountType}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h5 className="fw-bold">Sign Up</h5>
          <Signup
            data={formData}
            onChange={handleOnChange}
            onSubmit={handleOnSubmit}
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
