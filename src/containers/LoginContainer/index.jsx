import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AuthLayout } from "Layout";
import Login from "Components/Auth/Login";

import { signInRequest } from "store/User/actions";

const initialFormData = { email: "", password: "" };

const mapState = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
});

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(mapState);

  const [formData, setFormData] = useState(initialFormData);

  // update state when login form field changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // on submit login form
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signInRequest(formData));
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthLayout>
      <h5 className="fw-bold">Login</h5>
      <Login
        data={formData}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
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
