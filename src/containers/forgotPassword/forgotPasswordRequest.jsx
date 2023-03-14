import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FormInput } from "Components/forms/Inputs";
import { SaveButton } from "Components/forms/Buttons";

import { forgotPasswordRequest } from "store/User/actions";
import { isValidEmail } from "utils/helper";
import { toastMessage } from "utils/toastMessage";

import { EMAIL, EMAIL_NOT_VALID } from "constants/userMessagesConstants";

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
});

const ForgotPasswordRequest = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(mapState);

  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toastMessage(EMAIL_NOT_VALID, "error");
      return;
    }
    dispatch(forgotPasswordRequest({ email_id: email }));
  };

  const isSaveDisabled = isLoading || !email;

  return (
    <div>
      <h5 className="fw-bold">Forgot Password</h5>
      <p>
        Enter your email address and we will send you a password reset link.
      </p>
      <Form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder={EMAIL}
          isRequired
        />
        <SaveButton
          type="submit"
          label="Send reset password email"
          className="w-100"
          disabled={isSaveDisabled}
        />
      </Form>
    </div>
  );
};

export default ForgotPasswordRequest;
