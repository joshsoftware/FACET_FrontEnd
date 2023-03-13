import React from "react";
import { Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { AuthLayout } from "Layout";
import Input from "Components/forms/Inputs/Input";
import Button from "Components/forms/Button";

import { signInRequest } from "store/User/actions";

import {
  ADD_ORGANIZATION_ROUTE,
  DASHBOARD_ROUTE,
} from "constants/routeConstants";
import { EMAIL_REGEX } from "constants/appConstants";
import { EMAIL_NOT_VALID } from "constants/userMessagesConstants";

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(EMAIL_REGEX, EMAIL_NOT_VALID)
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "The password must be at least 4 characters long.")
    .required("Password is required"),
});

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
  isLoggedIn: user.isLoggedIn,
  isMemberOfOrg: !!user.currentUser?.user_organization,
  isPersonalAccount: user.isPersonalAccount,
});

const LoginContainer = () => {
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn, isMemberOfOrg, isPersonalAccount } =
    useSelector(mapState);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signInRequest(values));
    },
  });

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
      <Form onSubmit={formik.handleSubmit}>
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
          type="password"
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={formik.touched.password && Boolean(formik.errors.password)}
          errorText={formik.touched.password && formik.errors.password}
          required
        />
        <Button
          type="submit"
          iconType="save"
          className="w-100"
          isLoading={isLoading}
        >
          Login
        </Button>
      </Form>
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
