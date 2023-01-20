import { call, put, takeLatest } from "redux-saga/effects";

import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";
import {
  getOrganizationFailure,
  getOrganizationsFailure,
  getOrganizationsSuccess,
  getOrganizationSuccess,
  getUsersFailure,
  getUsersSuccess,
} from "./actions";
import { getOrganizationApi, getOrganizationsApi, getUsersApi } from "./apis";

import facetAdminConstants from "./constants";

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

export function* getOrganization() {
  try {
    const response = yield call(getOrganizationApi);
    yield put(getOrganizationSuccess(response));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getOrganizationFailure());
  }
}

export function* getUsers() {
  try {
    const response = yield call(getUsersApi);
    yield put(getUsersSuccess(response.users));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getUsersFailure());
  }
}

// Watcher saga
export default function* adminSagas() {
  yield takeLatest(
    facetAdminConstants.GET_ORGANIZATIONS_ADMIN_REQUEST,
    getOrganizations
  );
  yield takeLatest(
    facetAdminConstants.GET_ORGANIZATION_ADMIN_REQUEST,
    getOrganization
  );
  yield takeLatest(facetAdminConstants.GET_USERS_ADMIN_REQUEST, getUsers);
}
