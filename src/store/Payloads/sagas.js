import { call, put, takeLatest } from "redux-saga/effects";

import { addPayloadApi, editPayloadApi, getPayloadsApi } from "./apis";
import {
  addPayloadsFailure,
  editPayloadsFailure,
  getPayloadsFailure,
  getPayloadsSuccess,
} from "./actions";

import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import payloadConstants from "./constants";
import { PAYLOADS } from "constants/userMessagesConstants";

export function* getPayloads({ payload }) {
  try {
    const response = yield call(getPayloadsApi, payload);
    yield put(getPayloadsSuccess(response.payloads));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getPayloadsFailure());
  }
}

export function* addPayload({ payload }) {
  try {
    yield call(addPayloadApi, payload);
    toastMessage(PAYLOADS.ADD_NEW_SUCCESS, "success");
    yield call(getPayloads, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addPayloadsFailure());
  }
}

export function* editPayload({ payload }) {
  try {
    yield call(editPayloadApi, payload);
    toastMessage(PAYLOADS.UPDATE_SUCCESS, "success");
    yield call(getPayloads, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(editPayloadsFailure());
  }
}

export default function* payloadSagas() {
  yield takeLatest(payloadConstants.GET_PAYLOADS_REQUEST, getPayloads);
  yield takeLatest(payloadConstants.ADD_PAYLOADS_REQUEST, addPayload);
  yield takeLatest(payloadConstants.EDIT_PAYLOADS_REQUEST, editPayload);
}
