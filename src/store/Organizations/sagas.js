import { call, put, takeLatest } from "redux-saga/effects";

import { apisErrorMessage } from "utils/apisErrorMessage";
import { getOrganizationsFailure, getOrganizationsSuccess } from "./actions";
import { toastMessage } from "utils/toastMessage";

import orgConstants from "./constants";

export function* getOrganizations() {
  try {
    const response = yield call();
    yield put(getOrganizationsSuccess(response.organizations));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getOrganizationsFailure());
  }
}

// watcher saga
export default function* organizationsSagas() {
  yield takeLatest(orgConstants.GET_ORGANIZATIONS_REQUEST);
}
