import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "Components/forms/Button";
import JSONForm from "Components/JSONForm";

import { forgotPasswordRequest } from "store/User/actions";

import { EMAIL, EMAIL_NOT_VALID } from "constants/userMessagesConstants";
import { EMAIL_REGEX } from "constants/appConstants";

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
});

const ForgotPasswordRequest = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(mapState);

  const handleSubmit = (value) => {
    dispatch(forgotPasswordRequest({ email_id: value.email }));
  };

  const formSchema = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: EMAIL,
      required: true,
      validations: {
        family: "string",
        matches: [EMAIL_REGEX, EMAIL_NOT_VALID],
      },
    },
    {
      component: (
        <Button
          type="submit"
          iconType="save"
          isLoading={isLoading}
          variant="success"
          className="w-100"
        >
          Send reset password email
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h5 className="fw-bold">Forgot Password</h5>
      <p>
        Enter your email address and we will send you a password reset link.
      </p>
      <JSONForm
        schema={formSchema}
        onSubmit={handleSubmit}
        defaultValues={{ email: "" }}
      />
    </div>
  );
};

export default ForgotPasswordRequest;
