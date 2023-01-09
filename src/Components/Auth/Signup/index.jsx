import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import { SubmitButton } from "Components/forms/Buttons";

import { USER_AUTH } from "constants/userMessagesConstants";

const Signup = ({ data, onChange, onSubmit }) => {
  const { name, email, username, password, confirmPassword } = data;

  // check whether if password and confirm password fields are matched or not
  const isPasswordMatched = password === confirmPassword;
  const isButtonDisabled =
    !name || !email || !password || !confirmPassword || !isPasswordMatched;

  return (
    <Form className="py-2" onSubmit={onSubmit}>
      <FormInput
        label="Name"
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Enter Name"
        isRequired
      />
      <FormInput
        label="Username"
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Enter Username"
        isRequired
      />
      <FormInput
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Enter Email"
        isRequired
      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Enter Password"
        isRequired
      />
      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        placeholder="Enter Password"
        className={!isPasswordMatched ? "border-danger error" : ""}
        errorMessage={USER_AUTH.PASSWORD_NOT_MATCHED}
        error={!isPasswordMatched}
        isRequired
      />
      <SubmitButton
        label="SignUp"
        className="w-100"
        disabled={isButtonDisabled}
      />
    </Form>
  );
};

Signup.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Signup;
