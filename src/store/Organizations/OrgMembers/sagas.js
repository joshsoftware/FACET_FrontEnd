import { call, put, takeLatest } from "redux-saga/effects";

import { apisErrorMessage } from "utils/apisErrorMessage";
import {
  changeMemberRoleFailure,
  changeMemberRoleSuccess,
  getOrgMembersFailure,
  getOrgMembersSuccess,
  removeMemberFromOrgFailure,
  removeMemberFromOrgSuccess,
} from "./actions";
import { changeMemberRoleApi, getOrgMembersApi, removeMemberApi } from "./apis";
import { toastMessage } from "utils/toastMessage";

import {
  CHANGE_MEMBER_ROLE_SUCCESS,
  MEMBERS,
} from "constants/userMessagesConstants";
import orgMembersConstants from "./constants";

export function* getOrgMembers({ payload }) {
  try {
    const response = yield call(getOrgMembersApi, payload);
    yield put(getOrgMembersSuccess(response.members));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getOrgMembersFailure());
  }
}

export function* changeMemberRole({ payload }) {
  try {
    yield call(changeMemberRoleApi, payload);
    toastMessage(CHANGE_MEMBER_ROLE_SUCCESS);
    yield put(changeMemberRoleSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(changeMemberRoleFailure());
  }
}

export function* removerMemberFromOrg({ payload }) {
  try {
    yield call(removeMemberApi, payload);
    toastMessage(MEMBERS.REMOVE_SUCCESS);
    yield put(removeMemberFromOrgSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(removeMemberFromOrgFailure());
  }
}

// watcher saga
export default function* orgMembersSagas() {
  yield takeLatest(orgMembersConstants.GET_ORG_MEMBERS_REQUEST, getOrgMembers);
  yield takeLatest(
    orgMembersConstants.CHANGE_MEMBER_ROLE_REQUEST,
    changeMemberRole
  );
  yield takeLatest(
    orgMembersConstants.REMOVE_MEMBER_FROM_ORG_REQUEST,
    removerMemberFromOrg
  );
}
