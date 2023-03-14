import { takeLatest, call, put } from "redux-saga/effects";

import axiosInstance from "../../axios";

import {
  changePasswordApi,
  forgotPasswordRequestApi,
  getUserProfileApi,
  resetPasswordApi,
  signInApi,
  signUpApi,
  updateUserProfileApi,
} from "./apis";
import {
  changePasswordFailure,
  changePasswordSuccess,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  getUserProfileFailure,
  getUserProfileSuccess,
  resetPasswordFailure,
  resetPasswordSuccess,
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
  updateUserProfileFailure,
  updateUserProfileSuccess,
} from "./actions";
import { clearLocalStorage } from "utils/localStorage";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import userConstants from "./constants";
import {
  LOGOUT_SUCCESS,
  USERS,
  USER_AUTH,
} from "constants/userMessagesConstants";

export function* signIn({ payload }) {
  try {
    const response = yield call(signInApi, payload);
    toastMessage(USER_AUTH.LOGIN_SUCCESS);
    yield put(signInSuccess(response));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(signInFailure());
  }
}

export function* signUp({ payload }) {
  try {
    yield call(signUpApi, payload);
    toastMessage(USER_AUTH.SIGNUP_SUCCESS);
    yield put(signUpSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(signUpFailure());
  }
}

export function* signOut() {
  clearLocalStorage();
  // following line remove authorization token from axios instance
  axiosInstance.defaults.headers = {};
  yield put(signOutSuccess());
  toastMessage(LOGOUT_SUCCESS);
  // TODO: This is temporary solution to avoid redirection of user, need to find out stable solution
  window.location.reload();
}

export function* getuserProfile({ payload }) {
  try {
    const response = yield call(getUserProfileApi, payload);
    yield put(getUserProfileSuccess(response.user));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getUserProfileFailure());
  }
}

export function* updateUserProfile({ payload }) {
  try {
    const response = yield call(updateUserProfileApi, payload);
    toastMessage(USERS.UPDATE_PROFILE_SUCCESS);
    yield put(updateUserProfileSuccess(response.user));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(updateUserProfileFailure(error.data));
  }
}

export function* changeUserPassword({ payload }) {
  try {
    yield call(changePasswordApi, payload);
    toastMessage(USERS.CHANGE_PASSWORD_SUCCESS);
    yield put(changePasswordSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(changePasswordFailure());
  }
}

export function* forgotPassword({ payload }) {
  try {
    yield call(forgotPasswordRequestApi, payload);
    toastMessage(USERS.FORGOT_PASSWORD_SUCCESS);
    yield put(forgotPasswordSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(forgotPasswordFailure());
  }
}

export function* resetPassword({ payload }) {
  try {
    yield call(resetPasswordApi, payload);
    toastMessage(USERS.RESET_PASSWORD_SUCCESS);
    yield put(resetPasswordSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(resetPasswordFailure());
  }
}

// Watcher saga
export default function* userSagas() {
  yield takeLatest(userConstants.SIGN_UP_REQUEST, signUp);
  yield takeLatest(userConstants.SIGN_IN_REQUEST, signIn);
  yield takeLatest(userConstants.SIGN_OUT_REQUEST, signOut);
  yield takeLatest(userConstants.GET_CURRENT_USER_INFO_REQUEST, getuserProfile);
  yield takeLatest(
    userConstants.UPDATE_USER_PROFILE_REQUEST,
    updateUserProfile
  );
  yield takeLatest(
    userConstants.CHANGE_USER_PASSWORD_REQUEST,
    changeUserPassword
  );
  yield takeLatest(userConstants.FORGOT_PASSWORD_REQUEST, forgotPassword);
  yield takeLatest(userConstants.RESET_PASSWORD_REQUEST, resetPassword);
}
