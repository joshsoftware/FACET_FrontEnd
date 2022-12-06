import userConstants from "./constants";

export const signInRequest = (data) => ({
  type: userConstants.SIGN_IN_REQUEST,
  payload: data,
});

export const signInSuccess = (data) => ({
  type: userConstants.SIGN_IN_SUCCESS,
  payload: data,
});

export const signInFailure = () => ({
  type: userConstants.SIGN_IN_FAILURE,
});

export const signUpRequest = (data) => ({
  type: userConstants.SIGN_UP_REQUEST,
  payload: data,
});

export const signUpSuccess = () => ({
  type: userConstants.SIGN_UP_SUCCESS,
});

export const signUpFailure = () => ({
  type: userConstants.SIGN_UP_FAILURE,
});

export const signOutRequest = () => ({
  type: userConstants.SIGN_OUT_REQUEST,
});

export const signOutSuccess = () => ({
  type: userConstants.SIGN_OUT_SUCCESS,
});

export const signOutFailure = () => ({
  type: userConstants.SIGN_OUT_FAILURE,
});

export const getUsersRequest = (data) => ({
  type: userConstants.GET_USERS_REQUEST,
  payload: data,
});

export const getUsersSuccess = (data) => ({
  type: userConstants.GET_USERS_SUCCESS,
  payload: data,
});

export const getUsersFailure = () => ({
  type: userConstants.GET_USERS_FAILURE,
});

export const getUserProfileRequest = () => ({
  type: userConstants.GET_CURRENT_USER_INFO_REQUEST,
});

export const getUserProfileSuccess = (data) => ({
  type: userConstants.GET_CURRENT_USER_INFO_SUCCESS,
  payload: data,
});

export const getUserProfileFailure = () => ({
  type: userConstants.GET_CURRENT_USER_INFO_FAILURE,
});

export const updateUserProfileRequest = (data) => ({
  type: userConstants.UPDATE_USER_PROFILE_REQUEST,
  payload: data,
});

export const updateUserProfileSuccess = (data) => ({
  type: userConstants.UPDATE_USER_PROFILE_SUCCESS,
  payload: data,
});

export const updateUserProfileFailure = () => ({
  type: userConstants.UPDATE_USER_PROFILE_FAILURE,
});

export const changePasswordRequest = (data) => ({
  type: userConstants.CHANGE_USER_PASSWORD_REQUEST,
  payload: data,
});

export const changePasswordSuccess = () => ({
  type: userConstants.CHANGE_USER_PASSWORD_SUCCESS,
});

export const changePasswordFailure = () => ({
  type: userConstants.CHANGE_USER_PASSWORD_FAILURE,
});
