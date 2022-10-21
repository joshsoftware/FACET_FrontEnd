import userConstants from "./constants";


export const signInStart = (data) => ({
    type: userConstants.SIGN_IN_START,
    payload: data,
});

export const signInSuccess = (data) => ({
    type: userConstants.SIGN_IN_SUCCESS,
    payload: data,
});

export const signUpStart = (data) => ({
    type: userConstants.SIGN_UP_START,
    payload: data,
});

export const signOutStart = (data) => ({
    type: userConstants.SIGN_OUT_START,
    payload: data,
});

export const signOutSuccess = (data) => ({
    type: userConstants.SIGN_OUT_SUCCESS,
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

export const getUserProfileReuest = (data) => ({
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

export const updateUserProfileReuest = (data) => ({
    type: userConstants.UPDATE_USER_REQUEST,
    payload: data,
});

export const updateUserProfileSuccess = (data) => ({
    type: userConstants.UPDATE_USER_SUCCESS,
    payload: data,
});

export const updateUserProfileFailure = (data) => ({
    type: userConstants.UPDATE_USER_FAILURE,
    payload: data,
});

export const changePasswordReuest = (data) => ({
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
