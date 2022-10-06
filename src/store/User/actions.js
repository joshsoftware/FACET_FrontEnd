import userConstants from "./constants";


export const signInStart = (data) => ({
    type: userConstants.SIGN_IN_START,
    payload: data
});

export const signInSuccess = (data) => ({
    type: userConstants.SIGN_IN_SUCCESS,
    payload: data
})

export const signUpStart = (data) => ({
    type: userConstants.SIGN_UP_START,
    payload: data
})

export const signOutStart = (data) => ({
    type: userConstants.SIGN_OUT_START,
    payload: data
});

export const signOutSuccess = (data) => ({
    type: userConstants.SIGN_OUT_SUCCESS,
    payload: data
});

export const getAllUsersRequest = (data) => ({
    type: userConstants.GET_ALL_USERS_REQUEST,
    payload: data
})

export const getAllUsersSuccess = (data) => ({
    type: userConstants.GET_ALL_USERS_SUCCESS,
    payload: data
})

export const getAllUsersFailure = (data) => ({
    type: userConstants.GET_ALL_USERS_FAILURE,
    payload: data
})