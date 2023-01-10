import { call, put, takeLatest } from "redux-saga/effects";

import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";
import { getOrgMembersFailure, getOrgMembersSuccess } from "./actions";
import { getOrgMembersApi } from "./apis";

import orgMembersConstants from "./constants";

export function* getOrgMembers({ payload }) {
  try {
    const response = call(getOrgMembersApi, payload);
    yield put(getOrgMembersSuccess(response.members));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getOrgMembersFailure());
  }
}

// watcher saga
export default function* orgMembersSagas() {
  yield takeLatest(orgMembersConstants.GET_ORG_MEMBERS_REQUEST, getOrgMembers);
}
