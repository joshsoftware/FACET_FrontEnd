import { call, put, takeLatest } from "redux-saga/effects";

import { getHeadersFailure, getHeadersSuccess } from "./actions";
import { addHeaderApi, editHeaderApi, getHeadersApi } from "./apis";
import headerConstants from "./constants";

import { HEADERS } from "constants/userMessagesConstants";
import { toastMessage } from "utils/toastMessage";
import { apisErrorMessage } from "utils/apisErrorMessage";

export function* getHeaders({ payload }) {
  try {
    const response = yield call(getHeadersApi, payload);
    yield put(getHeadersSuccess(response.headers));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getHeadersFailure(errorMessage));
  }
}

export function* addHeader({ payload }) {
  try {
    yield call(addHeaderApi, payload);
    toastMessage(HEADERS.ADD_NEW_SUCCESS, "success");
    yield call(getHeaders, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getHeadersFailure(errorMessage));
  }
}

export function* editHeader({ payload }) {
  try {
    yield call(editHeaderApi, payload);
    toastMessage(HEADERS.UPDATE_SUCCESS, "success");
    yield call(getHeaders, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getHeadersFailure(errorMessage));
  }
}

// Watcher saga
export default function* headerSagas() {
  yield takeLatest(headerConstants.GET_HEADERS_REQUEST, getHeaders);
  yield takeLatest(headerConstants.ADD_HEADERS_REQUEST, addHeader);
  yield takeLatest(headerConstants.EDIT_HEADERS_REQUEST, editHeader);
}
