import React from "react";
import { useDispatch, useSelector } from "react-redux";

import JSONForm from "Components/JSONForm";

import { forgotPasswordRequest } from "store/User/actions";

import { EMAIL, EMAIL_NOT_VALID } from "constants/userMessagesConstants";
import { EMAIL_REGEX } from "constants/appConstants";

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
});

const initialValues = { email: "" };

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
    type: "button",
    label: "Send reset password email",
    name: "forgotPasswordButton",
    buttonType: "submit",
    variant: "success",
    iconType: "save",
    className: "w-100",
  },
];

const ForgotPasswordRequest = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(mapState);

  const handleSubmit = (value) => {
    dispatch(forgotPasswordRequest({ email_id: value.email }));
  };

  return (
    <div>
      <h5 className="fw-bold">Forgot Password</h5>
      <p>
        Enter your email address and we will send you a password reset link.
      </p>
      <JSONForm
        schema={formSchema}
        onSubmit={handleSubmit}
        defaultValues={initialValues}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ForgotPasswordRequest;
