import { call, put, takeLatest } from "redux-saga/effects";

import { addExecuteFailure, addExecuteSuccess } from "./actions";
import { executeTestcaseApi } from "./apis";
import executeConstants from "./constants";

import { componentMissingErrors } from "utils/helper";
import { toastMessage } from "utils/toastMessage";

export function* addExecute({ payload }) {
  try {
    delete payload.data;
    const response = yield call(executeTestcaseApi, payload);
    yield put(addExecuteSuccess(response));
  } catch (error) {
    const errorMessage = componentMissingErrors(error.data.error);
    yield put(addExecuteFailure());
    toastMessage(errorMessage, "error");
  }
}

export default function* executeSagas() {
  yield takeLatest(executeConstants.ADD_EXECUTE_REQUEST, addExecute);
}
