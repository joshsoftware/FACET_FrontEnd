import { call, put, takeLatest } from "redux-saga/effects";

import { addCommentApi, getAllReportsApi, getSingleReportsApi } from "./apis";
import {
  addCommentFailure,
  addCommentSuccess,
  getReportsSuccess,
  getReportDetailFailure,
  getReportDetailSuccess,
  getReportsFailure,
} from "./actions";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import { COMMENT_ADD_SUCCESS } from "constants/userMessagesConstants";
import reportsConstants from "./constants";

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
    yield put(getReportsFailure());
  }
}

export function* getReportDetail({ payload: { reportId } }) {
  try {
    const report = yield call(getSingleReportsApi, reportId);
    yield put(getReportDetailSuccess(report));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getReportDetailFailure());
  }
}

export function* addComment({ payload }) {
  try {
    yield call(addCommentApi, payload);
    yield put(addCommentSuccess());
    yield call(getReports, { payload: { project: payload.project } });
    toastMessage(COMMENT_ADD_SUCCESS);
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addCommentFailure());
  }
}

// Watcher saga
export default function* reportSagas() {
  yield takeLatest(reportsConstants.GET_REPORTS_REQUEST, getReports);
  yield takeLatest(reportsConstants.GET_REPORT_REQUEST, getReportDetail);
  yield takeLatest(reportsConstants.ADD_COMMENT_REQUEST, addComment);
}
