import { call, put, takeLatest } from "redux-saga/effects";

import { addAdminsApi } from "./apis";
import { addAdminsFailure, addAdminsSuccess } from "./actions";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import { ADMINS_ADD_SUCCESS } from "constants/userMessagesConstants";
import superAdminConstants from "./constants";

export function* addAdmins({ payload }) {
  try {
    yield call(addAdminsApi, payload);
    toastMessage(ADMINS_ADD_SUCCESS);
    yield put(addAdminsSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    yield put(addAdminsFailure());
    toastMessage(errorMessage, "danger");
  }
}

// Watcher Saga
export default function* superAdminSagas() {
  yield takeLatest(superAdminConstants.ADD_ADMINS_REQUEST, addAdmins);
}
