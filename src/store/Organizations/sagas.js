import { call, put, takeLatest } from "redux-saga/effects";

import { apisErrorMessage } from "utils/apisErrorMessage";
import { addOrganizationApi, getOrganizationsApi } from "./apis";
import {
  addOrganizationFailure,
  addOrganizationSuccess,
  getOrganizationsFailure,
  getOrganizationsSuccess,
} from "./actions";
import { toastMessage } from "utils/toastMessage";

import orgConstants from "./constants";
import { ORGANIZATIONS } from "constants/userMessagesConstants";

export function* getOrganizations() {
  try {
    const response = yield call(getOrganizationsApi);
    yield put(getOrganizationsSuccess(response.organizations));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getOrganizationsFailure());
  }
}

export function* addOrganization({ payload }) {
  try {
    const response = yield call(addOrganizationApi, payload);
    toastMessage(ORGANIZATIONS.ADD_NEW_SUCCESS);
    yield put(addOrganizationSuccess(response));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addOrganizationFailure());
  }
}

// watcher saga
export default function* organizationsSagas() {
  yield takeLatest(orgConstants.GET_ORGANIZATIONS_REQUEST, getOrganizations);
  yield takeLatest(orgConstants.ADD_ORGANIZATION_REQUEST, addOrganization);
}
