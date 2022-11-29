import { call, put, takeLatest } from "redux-saga/effects";

import { addExecuteFailure, addExecuteSuccess } from "./actions";
import executeConstants from "./constants";
import { executeTestcaseApi } from "./apis";

import { componentMissingErrors } from "utils/helper";
import { toastMessage } from "utils/toastMessage";

export function* addExecute({ payload }) {
  try {
    delete payload.data;
    const response = yield call(executeTestcaseApi, payload);
    yield put(addExecuteSuccess(response));
  } catch (error) {
    const err = error.data.error;
    let errMsg = componentMissingErrors(err);
    yield put(addExecuteFailure(errMsg));
    toastMessage(errMsg, "error");
  }
}

export default function* executeSagas() {
  yield takeLatest(executeConstants.ADD_EXECUTE_REQUEST, addExecute);
}
