import { call, put, takeLatest } from "redux-saga/effects";

import { apisErrorMessage } from "utils/apisErrorMessage";
import {
  acceptJoinOrgInvitationApi,
  addOrganizationApi,
  editOrganizationApi,
  getOrganizationApi,
  inviteUsersInOragnizationApi,
} from "./apis";
import {
  acceptJoinOrgInvitationFailure,
  acceptJoinOrgInvitationSuccess,
  addOrganizationFailure,
  addOrganizationSuccess,
  editOrganizationFailure,
  editOrganizationSuccess,
  getOrganizationFailure,
  getOrganizationSuccess,
  inviteUsersInOrganizationFailure,
  inviteUsersInOrganizationSuccess,
} from "./actions";
import { toastMessage } from "utils/toastMessage";

import {
  INVITE_USERS_SUCCESS,
  ORGANIZATIONS,
} from "constants/userMessagesConstants";
import orgConstants from "./constants";

export function* getOrganization({ payload }) {
  try {
    const response = yield call(getOrganizationApi, payload);
    yield put(getOrganizationSuccess(response.organization));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getOrganizationFailure());
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

export function* editOrganization({ payload }) {
  try {
    const response = yield call(editOrganizationApi, payload);
    toastMessage(ORGANIZATIONS.UPDATE_PROFILE_SUCCESS);
    yield put(editOrganizationSuccess(response));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(editOrganizationFailure());
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

export function* acceptJoinOrgInvitation({ payload }) {
  try {
    yield call(acceptJoinOrgInvitationApi, payload);
    toastMessage(ORGANIZATIONS.JOIN_ORG_SUCCESS);
    yield put(acceptJoinOrgInvitationSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(acceptJoinOrgInvitationFailure());
  }
}

// watcher saga
export default function* organizationsSagas() {
  yield takeLatest(orgConstants.GET_ORGANIZATION_REQUEST, getOrganization);
  yield takeLatest(orgConstants.ADD_ORGANIZATION_REQUEST, addOrganization);
  yield takeLatest(orgConstants.EDIT_ORGANIZATION_REQUEST, editOrganization);
  yield takeLatest(
    orgConstants.INVITE_USERS_IN_ORGANIZATION_REQUEST,
    inviteUsersInOrganization
  );
  yield takeLatest(
    orgConstants.ACCEPT_JOIN_ORG_INVITATION_REQUEST,
    acceptJoinOrgInvitation
  );
}
