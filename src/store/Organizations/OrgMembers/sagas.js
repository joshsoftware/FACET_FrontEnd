import { call, put, takeLatest } from "redux-saga/effects";

import { apisErrorMessage } from "utils/apisErrorMessage";
import {
  changeMemberRoleFailure,
  getOrgMembersFailure,
  getOrgMembersSuccess,
} from "./actions";
import { changeMemberRoleApi, getOrgMembersApi } from "./apis";
import { toastMessage } from "utils/toastMessage";

import { CHANGE_MEMBER_ROLE_SUCCESS } from "constants/userMessagesConstants";
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
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(changeMemberRoleFailure());
  }
}

// watcher saga
export default function* orgMembersSagas() {
  yield takeLatest(orgMembersConstants.GET_ORG_MEMBERS_REQUEST, getOrgMembers);
  yield takeLatest(
    orgMembersConstants.CHANGE_MEMBER_ROLE_REQUEST,
    changeMemberRole
  );
}
