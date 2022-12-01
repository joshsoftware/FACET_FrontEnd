import { call, put, takeLatest } from "redux-saga/effects";

import {
  addMembersInProjectApi,
  getProjectMembersApi,
  removeMembersInProjectApi,
} from "./apis";
import { getProjectMembersSuccess } from "./actions";
import projectMembersConstants from "./constants";

import { MEMBERS } from "constants/userMessagesConstants";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

export function* getProjectMembers({ payload }) {
  try {
    const response = yield call(getProjectMembersApi, payload);
    yield put(getProjectMembersSuccess(response));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
  }
}

export function* addMembersInProject({ payload }) {
  try {
    yield call(addMembersInProjectApi, payload);
    yield call(getProjectMembers, { payload: { project: payload.project } });
    toastMessage(MEMBERS.ADD_NEW_SUCCESS, "success");
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
  }
}

export function* removeMembersInProject({ payload }) {
  try {
    yield call(removeMembersInProjectApi, payload);
    yield call(getProjectMembers, { payload: { project: payload.project } });
    toastMessage(MEMBERS.REMOVE_SUCCESS, "success");
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
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
}
