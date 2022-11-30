import { call, put, takeLatest } from "redux-saga/effects";

import { addAdminsApi } from "./apis";
import { addAdminsFailure, addAdminsSuccess } from "./actions";
import superAdminConstants from "./constants";

import { ADMINS_ADD_SUCCESS } from "constants/userMessagesConstants";
import { toastMessage } from "utils/toastMessage";

export function* addAdmins({ payload }) {
  try {
    yield call(addAdminsApi, payload);
    toastMessage(ADMINS_ADD_SUCCESS, "success");
    yield put(addAdminsSuccess());
  } catch (error) {
    const errorMessage = error.data?.error;
    yield put(addAdminsFailure(errorMessage));
    toastMessage(errorMessage, "danger");
  }
}

// Watcher Saga
export default function* superAdminSagas() {
  yield takeLatest(superAdminConstants.ADD_ADMINS_REQUEST, addAdmins);
}
