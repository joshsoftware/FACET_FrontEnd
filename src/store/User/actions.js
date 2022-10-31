import userConstants from './constants';

export const signInRequest = (data) => ({
    type: userConstants.SIGN_IN_REQUEST,
    payload: data,
});

export const signInSuccess = (data) => ({
    type: userConstants.SIGN_IN_SUCCESS,
    payload: data,
});

export const signInFailure = (data) => ({
    type: userConstants.SIGN_IN_FAILURE,
    payload: data,
});

export const signUpRequest = (data) => ({
    type: userConstants.SIGN_UP_REQUEST,
    payload: data,
});

export const signUpSuccess = (data) => ({
    type: userConstants.SIGN_UP_SUCCESS,
    payload: data,
});

export const signUpFailure = (data) => ({
    type: userConstants.SIGN_UP_FAILURE,
    payload: data,
});

export const signOutRequest = (data) => ({
    type: userConstants.SIGN_OUT_REQUEST,
    payload: data,
});

export const signOutSuccess = (data) => ({
    type: userConstants.SIGN_OUT_SUCCESS,
    payload: data,
});

export const signOutFailure = (data) => ({
    type: userConstants.SIGN_OUT_FAILURE,
    payload: data,
});

export const getAllUsersRequest = (data) => ({
    type: userConstants.GET_ALL_USERS_REQUEST,
    payload: data,
});

export const getAllUsersSuccess = (data) => ({
    type: userConstants.GET_ALL_USERS_SUCCESS,
    payload: data,
});

export const getAllUsersFailure = (data) => ({
    type: userConstants.GET_ALL_USERS_FAILURE,
    payload: data,
});

export const getUserProfileRequest = (data) => ({
    type: userConstants.GET_CURRENT_USER_INFO_REQUEST,
    payload: data,
});

export const getUserProfileSuccess = (data) => ({
    type: userConstants.GET_CURRENT_USER_INFO_SUCCESS,
    payload: data,
});

export const getUserProfileFailure = (data) => ({
    type: userConstants.GET_CURRENT_USER_INFO_FAILURE,
    payload: data,
});

export const updateUserProfileRequest = (data) => ({
    type: userConstants.UPDATE_USER_PROFILE_REQUEST,
    payload: data,
});

export const updateUserProfileSuccess = (data) => ({
    type: userConstants.UPDATE_USER_PROFILE_SUCCESS,
    payload: data,
});

export const updateUserProfileFailure = (data) => ({
    type: userConstants.UPDATE_USER_PROFILE_FAILURE,
    payload: data,
});

export const changePasswordRequest = (data) => ({
    type: userConstants.CHANGE_USER_PASSWORD_REQUEST,
    payload: data,
});

export const changePasswordSuccess = (data) => ({
    type: userConstants.CHANGE_USER_PASSWORD_SUCCESS,
    payload: data,
});

export const changePasswordFailure = (data) => ({
    type: userConstants.CHANGE_USER_PASSWORD_FAILURE,
    payload: data,
});
