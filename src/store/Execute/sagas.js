import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import executeConstants from "./constants";
import { executeTestcaseApi } from "./apis";
import { addExecuteFailure, addExecuteSuccess } from "./actions";

export function* addExecute({ payload }) {
  try {
    delete payload.data;
    const response = yield call(executeTestcaseApi, payload);
    yield put(addExecuteSuccess(response));
  } catch (error) {
    const err = error.data.error;
    yield put(addExecuteFailure(err));
    if (typeof err === "object") {
      let errMsg = Object.entries(err)[0];
      toast.error(`${errMsg[1].join(",")} in ${errMsg[0]}`);
    } else {
      toast.error(err);
    }
  }
}

export default function* executeSagas() {
  yield takeLatest(executeConstants.ADD_EXECUTE_REQUEST, addExecute);
}
