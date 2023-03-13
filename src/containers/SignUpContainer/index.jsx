import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import AccountTypeCard from "Components/Auth/Signup/AccountTypeCard";
import AuthLayout from "Layout/AuthLayout";
// import Signup from "Components/Auth/Signup";

import { clearUserState, signUpRequest } from "store/User/actions";

import { ACCOUNT_TYPES, SIGNUP_INITIAL_DATA } from "constants/authConstants";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "constants/routeConstants";
import { useFormik } from "formik";
import Input from "Components/forms/Inputs/Input";
import Button from "Components/forms/Button";

const mapState = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  isLoading: user.isLoading,
  isSignUpSuccess: user.isSignUpSuccess,
});

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .required("Name is required"),
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long.")
    .required(),
});

const SignUpContainer = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isSignUpSuccess, isLoading } = useSelector(mapState);

  const [formData, setFormData] = useState(SIGNUP_INITIAL_DATA);

  useEffect(() => {
    return () => dispatch(clearUserState());
  }, []);

  // handle formdata change
  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({ ...prevState, [name]: value }));
  // };

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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleOnSubmit,
  });

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

  const signupTitle =
    formData.accountType === "organization"
      ? "Create an enterprise account"
      : "Create an individual account";

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
          <h5 className="fw-bold">{signupTitle}</h5>
          <Form onSubmit={formik.handleSubmit}>
            <Input
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && Boolean(formik.errors.name)}
              errorText={formik.touched.name && formik.errors.name}
              required
            />
            <Input
              label="Username"
              name="username"
              placeholder="Enter Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.username && Boolean(formik.errors.username)
              }
              errorText={formik.touched.username && formik.errors.username}
              required
            />
            <Input
              label="Email"
              name="email"
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              errorText={formik.touched.email && formik.errors.email}
              required
            />
            <Input
              label="Password"
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.password && Boolean(formik.errors.password)
              }
              errorText={formik.touched.password && formik.errors.password}
              required
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              errorText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              required
            />
            <Button
              type="submit"
              iconType="save"
              className="w-100"
              isLoading={isLoading}
            >
              Signup
            </Button>
          </Form>
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
