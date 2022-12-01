import { call, put, takeLatest } from "redux-saga/effects";

import { addCommentApi, getAllReportsApi, getSingleReportsApi } from "./apis";
import {
  addCommentFailure,
  addCommentSuccess,
  getReportsSuccess,
  getTeststepReportFailure,
  getTeststepReportSuccess,
  getReportDetailFailure,
  getReportDetailSuccess,
  getReportsFailure,
} from "./actions";
import reportsConstants from "./constants";

import { COMMENT_ADD_SUCCESS } from "constants/userMessagesConstants";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

export function* getReports({ payload }) {
  try {
    const response = yield call(getAllReportsApi, {
      ...payload,
      pageSize: reportsConstants.PAGE_SIZE,
    });
    yield put(getReportsSuccess(response));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getReportsFailure(errorMessage));
  }
}

export function* getReportDetail({ payload: { reportId } }) {
  try {
    const report = yield call(getSingleReportsApi, reportId);
    yield put(getReportDetailSuccess(report));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getReportDetailFailure(errorMessage));
  }
}

export function* getTeststepOfSingleTestcaseReport({ payload }) {
  try {
    // For now, this saga stores static data in the reducers,
    // but after the time this saga fetch data from api call
    const { teststep } = payload;
    yield put(getTeststepReportSuccess(teststep));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getTeststepReportFailure(errorMessage));
  }
}

export function* addComment({ payload }) {
  try {
    yield call(addCommentApi, payload);
    yield put(addCommentSuccess());
    yield call(getReports, { payload: { project: payload.project } });
    toastMessage(COMMENT_ADD_SUCCESS, "success");
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addCommentFailure(errorMessage));
  }
}

// Watcher saga
export default function* reportSagas() {
  yield takeLatest(reportsConstants.GET_REPORTS_REQUEST, getReports);
  yield takeLatest(reportsConstants.GET_SINGLE_REPORT_REQUEST, getReportDetail);
  yield takeLatest(
    reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_REQUEST,
    getTeststepOfSingleTestcaseReport
  );
  yield takeLatest(reportsConstants.ADD_COMMENT_REQUEST, addComment);
}
