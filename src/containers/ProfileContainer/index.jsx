import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChangePasswordForm from "Components/ProfileComponents/ChangePasswordForm";
import {
  changePasswordRequest,
  updateUserProfileRequest,
} from "store/User/actions";
import UpdateProfile from "Components/ProfileComponents/UpdateProfile";

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
  user: user.currentUser,
});

const ProfileContainer = () => {
  let dispatch = useDispatch();
  const { user, isLoading } = useSelector(mapState);

  const [userData, setUserData] = useState({ name: "", email: "" });
  const [changePassForm, setChangePassForm] = useState({
    currPass: "",
    newPass: "",
    conNewPass: "",
  });

  useEffect(() => {
    setUserData((p) => ({
      ...p,
      name: user?.name,
      email: user?.email,
    }));
  }, [user]);

  const onChangeUserData = (e) => {
    setUserData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitUpdateUserData = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUserProfileRequest(userData));
    },
    [userData]
  );

  const onChangePasswordFormData = (e) => {
    setChangePassForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitChangePasswordForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        changePasswordRequest({
          curr_password: changePassForm.currPass,
          new_password: changePassForm.newPass,
          con_new_password: changePassForm.conNewPass,
        })
      );
    },
    [changePassForm]
  );

  return (
    <>
      <UpdateProfile
        data={userData}
        isLoading={isLoading}
        onChange={onChangeUserData}
        onSubmit={onSubmitUpdateUserData}
      />
      <ChangePasswordForm
        data={changePassForm}
        isLoading={isLoading}
        onChange={onChangePasswordFormData}
        onSubmit={onSubmitChangePasswordForm}
      />
    </>
  );
};

export default ProfileContainer;
