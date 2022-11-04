import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { addTestsuiteApi, editTestsuiteApi, getTestsuitesApi } from "./apis";
import {
  addTestsuiteFailure,
  editTestsuiteFailure,
  getTestsuitesFailure,
  getTestsuitesSuccess,
} from "./actions";

import testsuiteConstants from "./constants";

export function* getTestsuites({ payload }) {
  try {
    const response = yield call(getTestsuitesApi, payload);
    yield put(getTestsuitesSuccess(response.testsuites));
  } catch (error) {
    const errorResp =
      error.data?.error ?? "Something went wrong while fetching testsuites!";
    toast.error(errorResp);
    yield put(getTestsuitesFailure(errorResp));
  }
}

export function* addTestsuite({ payload }) {
  try {
    yield call(addTestsuiteApi, payload);
    toast.success("Testsuite Added Successfully!");
    yield call(getTestsuites, { payload: { project: payload.project } });
  } catch (error) {
    const errorResp =
      error.data?.error ?? "Something went wrong while adding testsuite!";
    toast.error(errorResp);
    yield put(addTestsuiteFailure(errorResp));
  }
}

export function* editTestsuite({ payload }) {
  try {
    yield call(editTestsuiteApi, payload);
    toast.success("Testsuite Updated Successfully!");
    yield call(getTestsuites, { payload: { project: payload.project } });
  } catch (error) {
    const errorResp =
      error.data?.error ?? "Something went wrong while updating testsuite!";
    toast.error(errorResp);
    yield put(editTestsuiteFailure(errorResp));
  }
}

// Watcher saga
export default function* testsuiteSagas() {
  yield takeLatest(testsuiteConstants.GET_TESTSUITES_REQUEST, getTestsuites);
  yield takeLatest(testsuiteConstants.ADD_TESTSUITE_REQUEST, addTestsuite);
  yield takeLatest(testsuiteConstants.EDIT_TESTSUITE_REQUEST, editTestsuite);
}
