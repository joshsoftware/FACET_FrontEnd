import { call, put, takeLatest } from "redux-saga/effects";

import { addEndpointApi, editEndpointApi, getEndpointsApi } from "./apis";
import {
  addEndpointsFailure,
  editEndpointsFailure,
  getEndpointsFailure,
  getEndpointsSuccess,
} from "./actions";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import endpointConstants from "./constants";
import { ENDPOINTS } from "constants/userMessagesConstants";

export function* getEndpoints({ payload }) {
  try {
    const response = yield call(getEndpointsApi, payload);
    yield put(getEndpointsSuccess(response.endpoints));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getEndpointsFailure());
  }
}

export function* addEndpoint({ payload }) {
  try {
    yield call(addEndpointApi, payload);
    yield call(getEndpoints, { payload: { project: payload.project } });
    toastMessage(ENDPOINTS.ADD_NEW_SUCCESS);
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addEndpointsFailure());
  }
}

export function* editEndpoint({ payload }) {
  try {
    yield call(editEndpointApi, payload);
    toastMessage(ENDPOINTS.UPDATE_SUCCESS);
    yield call(getEndpoints, { payload: { project: payload.project } });
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(editEndpointsFailure());
  }
}

// Watcher saga
export default function* endpointSagas() {
  yield takeLatest(endpointConstants.GET_ENDPOINT_REQUEST, getEndpoints);
  yield takeLatest(endpointConstants.ADD_ENDPOINT_REQUEST, addEndpoint);
  yield takeLatest(endpointConstants.EDIT_ENDPOINT_REQUEST, editEndpoint);
}
