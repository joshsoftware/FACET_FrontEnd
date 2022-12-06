import { call, put, takeLatest } from "redux-saga/effects";

import { addTestsuiteApi, editTestsuiteApi, getTestsuitesApi } from "./apis";
import {
  addTestsuiteFailure,
  editTestsuiteFailure,
  getTestsuitesFailure,
  getTestsuitesSuccess,
} from "./actions";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import testsuiteConstants from "./constants";
import { TESTSUITES } from "constants/userMessagesConstants";

export function* getTestsuites({ payload }) {
  try {
    const response = yield call(getTestsuitesApi, payload);
    yield put(getTestsuitesSuccess(response.testsuites));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getTestsuitesFailure());
  }
}

export function* addTestsuite({ payload }) {
  try {
    yield call(addTestsuiteApi, payload);
    toastMessage(TESTSUITES.ADD_NEW_SUCCESS);
    yield call(getTestsuites, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addTestsuiteFailure());
  }
}

export function* editTestsuite({ payload }) {
  try {
    yield call(editTestsuiteApi, payload);
    toastMessage(TESTSUITES.UPDATE_SUCCESS);
    yield call(getTestsuites, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(editTestsuiteFailure());
  }
}

// Watcher saga
export default function* testsuiteSagas() {
  yield takeLatest(testsuiteConstants.GET_TESTSUITES_REQUEST, getTestsuites);
  yield takeLatest(testsuiteConstants.ADD_TESTSUITE_REQUEST, addTestsuite);
  yield takeLatest(testsuiteConstants.EDIT_TESTSUITE_REQUEST, editTestsuite);
}
