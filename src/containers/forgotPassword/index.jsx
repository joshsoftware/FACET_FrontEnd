import React from "react";
import { useSearchParams } from "react-router-dom";

import { AuthLayout } from "Layout";
import ResetPasswordForm from "./resetPasswordForm";
import ForgotPasswordRequest from "./forgotPasswordRequest";

const ForgotPassword = () => {
  // get token from querystring
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <AuthLayout>
      {token ? <ResetPasswordForm token={token} /> : <ForgotPasswordRequest />}
    </AuthLayout>
  );
};

export default ForgotPassword;
