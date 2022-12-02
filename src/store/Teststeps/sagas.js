import { call, put, takeLatest } from "redux-saga/effects";

import { addTeststepApi, editTeststepApi, getTeststepsApi } from "./apis";
import {
  addTeststepsFailure,
  editTeststepsFailure,
  getTeststepsFailure,
  getTeststepsSuccess,
} from "./actions";

import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import teststepConstants from "./constants";
import { TESTSTEPS } from "constants/userMessagesConstants";

export function* getTeststeps({ payload }) {
  try {
    const response = yield call(getTeststepsApi, payload);
    yield put(getTeststepsSuccess(response.teststeps));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getTeststepsFailure());
  }
}

export function* addTeststep({ payload }) {
  try {
    yield call(addTeststepApi, payload);
    toastMessage(TESTSTEPS.ADD_NEW_SUCCESS, "success");
    yield call(getTeststeps, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addTeststepsFailure());
  }
}

export function* editTeststep({ payload }) {
  try {
    yield call(editTeststepApi, payload);
    toastMessage(TESTSTEPS.UPDATE_SUCCESS, "success");
    yield call(getTeststeps, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(editTeststepsFailure());
  }
}

// Watcher Sagas
export default function* teststepSagas() {
  yield takeLatest(teststepConstants.GET_TESTSTEPS_REQUEST, getTeststeps);
  yield takeLatest(teststepConstants.ADD_TESTSTEPS_REQUEST, addTeststep);
  yield takeLatest(teststepConstants.EDIT_TESTSTEPS_REQUEST, editTeststep);
}
