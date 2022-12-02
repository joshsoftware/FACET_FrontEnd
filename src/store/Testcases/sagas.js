import { call, put, takeLatest } from "redux-saga/effects";

import { addTestcaseApi, editTestcaseApi, getTestcasesApi } from "./apis";
import {
  addTestcasesFailure,
  editTestcasesFailure,
  getTestcasesFailure,
  getTestcasesSuccess,
} from "./actions";
import testcaseConstants from "./constants";

import { TESTCASES } from "constants/userMessagesConstants";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

export function* getTestcases({ payload }) {
  try {
    const response = yield call(getTestcasesApi, payload);
    yield put(getTestcasesSuccess(response.testcases));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getTestcasesFailure(errorMessage));
  }
}

export function* addTestcase({ payload }) {
  try {
    yield call(addTestcaseApi, payload);
    toastMessage(TESTCASES.ADD_NEW_SUCCESS, "success");
    yield call(getTestcases, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addTestcasesFailure(errorMessage));
  }
}

export function* editTestcase({ payload }) {
  try {
    yield call(editTestcaseApi, payload);
    toastMessage(TESTCASES.UPDATE_SUCCESS, "success");
    yield call(getTestcases, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(editTestcasesFailure(errorMessage));
  }
}

// Watcher Saga
export default function* testcaseSagas() {
  yield takeLatest(testcaseConstants.GET_TESTCASES_REQUEST, getTestcases);
  yield takeLatest(testcaseConstants.ADD_TESTCASES_REQUEST, addTestcase);
  yield takeLatest(testcaseConstants.EDIT_TESTCASES_REQUEST, editTestcase);
}
