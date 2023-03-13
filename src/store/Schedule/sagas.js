import { call, put, takeLatest } from "redux-saga/effects";

import {
  addScheduleFailure,
  addScheduleSuccess,
  getSchedulesFailure,
  getSchedulesSuccess,
} from "./actions";
import { addScheduleApi, getSchedulesApi } from "./apis";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import scheduleConstants from "./constants";
import { TESTCASE_SCHEDULE_ADD_SUCCESS } from "constants/userMessagesConstants";

export function* getAllSchedules({ payload }) {
  try {
    const response = yield call(getSchedulesApi, payload);
    yield put(getSchedulesSuccess(response.scheduled_jobs));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getSchedulesFailure());
  }
}

export function* scheduleNewTestcase({ payload }) {
  try {
    yield call(addScheduleApi, payload);
    yield put(addScheduleSuccess());
    toastMessage(TESTCASE_SCHEDULE_ADD_SUCCESS);
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addScheduleFailure());
  }
}

// Watcher saga
export default function* scheduleSagas() {
  yield takeLatest(scheduleConstants.GET_SCHEDULES_REQUEST, getAllSchedules);
  yield takeLatest(scheduleConstants.ADD_SCHEDULE_REQUEST, scheduleNewTestcase);
}
