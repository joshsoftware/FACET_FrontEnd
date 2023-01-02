import { call, put, takeLatest } from "redux-saga/effects";

import { apisErrorMessage } from "utils/apisErrorMessage";
import {
  addOrganizationApi,
  getOrganizationsApi,
  inviteUsersInOragnizationApi,
} from "./apis";
import {
  addOrganizationFailure,
  addOrganizationSuccess,
  getOrganizationsFailure,
  getOrganizationsSuccess,
  inviteUsersInOrganizationFailure,
  inviteUsersInOrganizationSuccess,
} from "./actions";
import { toastMessage } from "utils/toastMessage";

import {
  INVITE_USERS_SUCCESS,
  ORGANIZATIONS,
} from "constants/userMessagesConstants";
import orgConstants from "./constants";

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

export function* inviteUsersInOrganization({ payload }) {
  try {
    yield call(inviteUsersInOragnizationApi, payload);
    toastMessage(INVITE_USERS_SUCCESS);
    yield put(inviteUsersInOrganizationSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(inviteUsersInOrganizationFailure());
  }
}

// watcher saga
export default function* organizationsSagas() {
  yield takeLatest(orgConstants.GET_ORGANIZATIONS_REQUEST, getOrganizations);
  yield takeLatest(orgConstants.ADD_ORGANIZATION_REQUEST, addOrganization);
  yield takeLatest(
    orgConstants.INVITE_USERS_IN_ORGANIZATION_REQUEST,
    inviteUsersInOrganization
  );
}
