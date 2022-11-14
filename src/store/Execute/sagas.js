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
    let errMsg;
    const err = error.data.error;
    yield put(addExecuteFailure(err));
    if (typeof err === "object") {
      if (Array.isArray(err)) {
        errMsg = "Something Went Wrong!";
      } else {
        let [errKey, errValue] = Object.entries(err)[0];
        errValue = Array.isArray(errValue)
          ? errValue.join(",")
          : "Some components missings";
        errMsg = `${errValue} in ${errKey}`;
      }
    } else {
      errMsg = err;
    }
    toast.error(errMsg);
  }
}

export default function* executeSagas() {
  yield takeLatest(executeConstants.ADD_EXECUTE_REQUEST, addExecute);
}
