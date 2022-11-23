import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { addCommentApi, getAllReportsApi, getSingleReportsApi } from "./apis";
import {
  addCommentFailure,
  addCommentSuccess,
  getReportsSuccess,
  getTeststepReportFailure,
  getTeststepReportSuccess,
  getReportDetailFailure,
  getReportDetailSuccess,
} from "./actions";
import reportsConstants from "./constants";

export function* getReports({ payload }) {
  try {
    const response = yield call(getAllReportsApi, {
      ...payload,
      pageSize: reportsConstants.PAGE_SIZE,
    });
    yield put(getReportsSuccess(response));
  } catch (error) {
    toast.error(error.data.error);
  }
}

export function* getReportDetail({ payload: { reportId } }) {
  try {
    const report = yield call(getSingleReportsApi, reportId);
    yield put(getReportDetailSuccess(report));
  } catch (error) {
    yield put(getReportDetailFailure(error));
    toast.error(error);
  }
}

export function* getTeststepOfSingleTestcaseReport({ payload }) {
  try {
    // For now, this saga stores static data in the reducers, 
    // but after the time this saga fetch data from api call
    const { teststep } = payload;
    yield put(getTeststepReportSuccess(teststep));
  } catch (error) {
    yield put(getTeststepReportFailure(error));
    toast.error(error);
  }
}

export function* addComment({ payload }) {
  try {
    yield call(addCommentApi, payload);
    yield put(addCommentSuccess());
    yield call(getReports, { payload: { project: payload.project } });
    toast.success("Comment Added Successfully!");
  } catch (error) {
    yield put(addCommentFailure(error));
    toast.error("Something Went Wrong!");
  }
}

export default function* reportSagas() {
  yield takeLatest(reportsConstants.GET_REPORTS_REQUEST, getReports);
  yield takeLatest(reportsConstants.GET_SINGLE_REPORT_REQUEST, getReportDetail);
  yield takeLatest(
    reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_REQUEST,
    getTeststepOfSingleTestcaseReport
  );
  yield takeLatest(reportsConstants.ADD_COMMENT_REQUEST, addComment);
}
