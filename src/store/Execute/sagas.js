import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { addExecuteFailure, addExecuteSuccess } from "./actions";
import executeConstants from "./constants";
import { executeTestcaseApi } from "./apis";

import { componentMissingErrors } from "utils/helper";

export function* addExecute({ payload }) {
  try {
    delete payload.data;
    const response = yield call(executeTestcaseApi, payload);
    yield put(addExecuteSuccess(response));
  } catch (error) {
    const err = error.data.error;
    yield put(addExecuteFailure(err));
    let errMsg = componentMissingErrors(err);
    toast.error(errMsg);
  }
}

export default function* executeSagas() {
  yield takeLatest(executeConstants.ADD_EXECUTE_REQUEST, addExecute);
}
