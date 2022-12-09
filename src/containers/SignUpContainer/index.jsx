import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthLayout from "Layout/AuthLayout";
import Signup from "Components/Auth/Signup";

import { clearUserState, signUpRequest } from "store/User/actions";

const initialState = { name: "", email: "", password: "", confirmPassword: "" };

const mapState = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  isSignupSuccess: user.isSignupSuccess,
});

const SignUpContainer = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isSignupSuccess } = useSelector(mapState);

  const [formData, setFormData] = useState(initialState);

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
    dispatch(signUpRequest(formData));
  };

  // If user already loggedin then redirect to dashboard screen
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  // If signup success redirect user to login screen
  if (isSignupSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthLayout>
      <h5 className="fw-bold">Sign Up</h5>
      <Signup
        data={formData}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
      <div className="d-flex flex-column align-items-center">
        <span className="pt-3">
          Already have an account?
          <Link to="/login" className="ps-1 fst-italic">
            Login
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
};

export default SignUpContainer;
