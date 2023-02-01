import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import { SubmitButton } from "Components/forms/Buttons";

const Login = ({ data, onChange, onSubmit }) => {
  const { email, password } = data;

  const isButtonDisabled = !email || !password;

  return (
    <Form className="py-2" onSubmit={onSubmit}>
      <FormInput
        label="Email"
        type="email"
        name="email"
        placeholder="Enter Email"
        value={email}
        onChange={onChange}
        isRequired
      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter Password"
        value={password}
        onChange={onChange}
        isRequired
      />
      {/* As APIs for this not available, it disabled for now */}
      {/* <div className="mb-3 w-100 text-end fs-6 fst-italic">
        <Link to="">Forgot Password?</Link>
      </div> */}
      <SubmitButton
        label="Login"
        className="w-100"
        disabled={isButtonDisabled}
      />
    </Form>
  );
};

Login.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
