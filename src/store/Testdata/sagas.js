import { call, put, takeLatest } from "redux-saga/effects";

import { addTestdataApi, editTestdataApi, getTestdatasApi } from "./apis";
import {
  addTestdataFailure,
  editTestdataFailure,
  editTestdataSuccess,
  getTestdataFailure,
  getTestdataSuccess,
} from "./actions";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import { TESTDATA } from "constants/userMessagesConstants";
import testdataConstants from "./constants";

export function* getTestdatas({ payload }) {
  try {
    const response = yield call(getTestdatasApi, payload);
    yield put(getTestdataSuccess(response.testdata));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getTestdataFailure());
  }
}

export function* addTestdata({ payload }) {
  try {
    yield call(addTestdataApi, payload);
    toastMessage(TESTDATA.ADD_NEW_SUCCESS);
    yield call(getTestdatas, { payload: { teststep: payload.teststep } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addTestdataFailure());
  }
}

export function* editTestdata({ payload }) {
  try {
    yield call(editTestdataApi, payload);
    toastMessage(TESTDATA.UPDATE_SUCCESS);
    yield put(editTestdataSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(editTestdataFailure());
  }
}

// Watcher sagas
export default function* testdataSagas() {
  yield takeLatest(testdataConstants.GET_TESTDATA_REQUEST, getTestdatas);
  yield takeLatest(testdataConstants.ADD_TESTDATA_REQUEST, addTestdata);
  yield takeLatest(testdataConstants.EDIT_TESTDATA_REQUEST, editTestdata);
}
