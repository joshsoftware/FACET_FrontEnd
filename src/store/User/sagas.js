import { takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
    changePasswordApi,
    getAllUsersApi,
    getUserProfileApi,
    signInApi,
    signUpApi,
    updateUserProfileApi,
} from "./apis";
import {
    changePasswordFailure,
    changePasswordSuccess,
    getAllUsersSuccess,
    getUserProfileFailure,
    getUserProfileSuccess,
    signInSuccess,
    signOutSuccess,
    updateUserProfileFailure,
    updateUserProfileSuccess,
} from "./actions";
import userConstants from "./constants";

export function* signIn({ payload }) {
    try {
        const response = yield call(signInApi, payload);
        toast.success("Login Successfully!");
        yield put(signInSuccess(response.user));
    } catch (error) {
        toast.error(error.data.error);
    }
}

export function* signUp({ payload: { name, email, password, cpassword } }) {
    try {
        if (password !== cpassword) {
            toast.error("Password Not Matched!");
            return;
        }
        yield call(signUpApi, { name, email, password });
        toast.success("SignUp Successfully!");
    } catch (error) {
        toast.error(error.data.error);
    }
}

export function* signOut() {
    localStorage.removeItem("user");
    yield put(signOutSuccess());
    toast.success("Log out successfully!");
}

export function* getAllUsers({ payload }) {
    try {
        const response = yield call(getAllUsersApi, payload);
        yield put(getAllUsersSuccess(response.users));
    } catch (error) {
        toast.error(error.data.errors);
    }
}

export function* getuserProfile({ payload }) {
    try {
        const response = yield call(getUserProfileApi, payload);
        yield put(getUserProfileSuccess(response.user));
    } catch (error) {
        toast.error(error.data.error);
        yield put(getUserProfileFailure(error.data));
    }
}

export function* updateUserProfile({ payload }) {
    try {
        const response = yield call(updateUserProfileApi, payload);
        toast.success(response.message);
        yield put(updateUserProfileSuccess(response.user));
    } catch (error) {
        toast.error(error.data.error);
        yield put(updateUserProfileFailure(error.data));
    }
}

export function* changeUserPassword({ payload }) {
    try {
        const response = yield call(changePasswordApi, payload);
        toast.success(response.message);
        yield put(changePasswordSuccess());
    } catch (error) {
        toast.error(error.data.error);
        yield put(changePasswordFailure());
    }
}

export default function* userSagas() {
    yield takeLatest(userConstants.SIGN_UP_START, signUp);
    yield takeLatest(userConstants.SIGN_IN_START, signIn);
    yield takeLatest(userConstants.SIGN_OUT_START, signOut);
    yield takeLatest(userConstants.GET_ALL_USERS_REQUEST, getAllUsers);
    yield takeLatest(userConstants.GET_CURRENT_USER_INFO_REQUEST, getuserProfile);
    yield takeLatest(userConstants.UPDATE_USER_PROFILE_REQUEST, updateUserProfile);
    yield takeLatest(userConstants.CHANGE_USER_PASSWORD_REQUEST, changeUserPassword);
}
