import { call, put, takeLatest } from "redux-saga/effects";

import {
  addMembersInProjectApi,
  getProjectMembersApi,
  removeMembersInProjectApi,
} from "./apis";
import {
  addMembersInProjectFailure,
  getFilteredUsersFailure,
  getFilteredUsersSuccess,
  getProjectMembersFailure,
  getProjectMembersSuccess,
  removeMembersInProjectFailure,
} from "./actions";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import { MEMBERS } from "constants/userMessagesConstants";
import projectMembersConstants from "./constants";

export function* getProjectMembers({ payload }) {
  try {
    const response = yield call(getProjectMembersApi, payload);
    yield put(getProjectMembersSuccess(response));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getProjectMembersFailure());
  }
}

export function* addMembersInProject({ payload }) {
  try {
    yield call(addMembersInProjectApi, payload);
    yield call(getProjectMembers, { payload: { project: payload.project } });
    toastMessage(MEMBERS.ADD_NEW_SUCCESS);
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addMembersInProjectFailure());
  }
}

export function* removeMembersInProject({ payload }) {
  try {
    yield call(removeMembersInProjectApi, payload);
    yield call(getProjectMembers, { payload: { project: payload.project } });
    toastMessage(MEMBERS.REMOVE_SUCCESS);
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(removeMembersInProjectFailure());
  }
}

export function* getFilteredUsers({ payload }) {
  try {
    const response = yield call(getProjectMembersApi, payload);
    yield put(getFilteredUsersSuccess(response.members));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getFilteredUsersFailure());
  }
}

// Watcher saga
export default function* projectMemberSagas() {
  yield takeLatest(
    projectMembersConstants.GET_PROJECT_MEMBERS_REQUEST,
    getProjectMembers
  );
  yield takeLatest(
    projectMembersConstants.ADD_MEMBERS_IN_PROJECT_REQUEST,
    addMembersInProject
  );
  yield takeLatest(
    projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_REQUEST,
    removeMembersInProject
  );
  yield takeLatest(
    projectMembersConstants.GET_FILTERED_USERS_REQUEST,
    getFilteredUsers
  );
}
