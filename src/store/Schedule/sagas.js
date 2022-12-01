import { call, put, takeLatest } from "redux-saga/effects";

import { addScheduleTestcaseApi, getAllSchesuledTestcasesApi } from "./apis";
import {
  addScheduleFailure,
  addScheduleSuccess,
  getAllSchedulesFailure,
  getAllSchedulesSuccess,
} from "./actions";
import scheduleConstants from "./constants";

import { TESTCASE_SCHEDULE_ADD_SUCCESS } from "constants/userMessagesConstants";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

export function* getAllSchedules({ payload }) {
  try {
    const response = yield call(getAllSchesuledTestcasesApi, payload);
    yield put(getAllSchedulesSuccess(response.scheduled_jobs));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getAllSchedulesFailure(errorMessage));
  }
}

export function* scheduleNewTestcase({ payload }) {
  try {
    yield call(addScheduleTestcaseApi, payload);
    yield put(addScheduleSuccess());
    toastMessage(TESTCASE_SCHEDULE_ADD_SUCCESS)
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addScheduleFailure(errorMessage));
  }
}

// Watcher saga
export default function* scheduleSagas() {
  yield takeLatest(
    scheduleConstants.GET_SCHEDULE_TESTCASE_REQUEST,
    getAllSchedules
  );
  yield takeLatest(scheduleConstants.ADD_SCHEDULE_REQUEST, scheduleNewTestcase);
}
