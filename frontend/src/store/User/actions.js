import userConstants from "./userConstants";

export const signInStart = (data) => ({
    type: userConstants.SIGN_IN_START,
    payload: data
});

export const signUpStart = (data) => ({
    type: userConstants.SIGN_UP_START,
    payload: data
})