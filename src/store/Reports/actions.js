import reportsConstants from "./constants";

export const getReportsRequest = (data) => ({
  type: reportsConstants.GET_REPORTS_REQUEST,
  payload: data,
});

export const getReportsSuccess = (data) => ({
  type: reportsConstants.GET_REPORTS_SUCCESS,
  payload: data,
});

export const getReportsFailure = () => ({
  type: reportsConstants.GET_REPORTS_FAILURE,
});

export const getReportDetailRequest = (data) => ({
  type: reportsConstants.GET_REPORT_REQUEST,
  payload: data,
});

export const getReportDetailSuccess = (data) => ({
  type: reportsConstants.GET_REPORT_SUCCESS,
  payload: data,
});

export const getReportDetailFailure = () => ({
  type: reportsConstants.GET_REPORT_FAILURE,
});

export const addCommentRequest = (data) => ({
  type: reportsConstants.ADD_COMMENT_REQUEST,
  payload: data,
});

export const addCommentSuccess = () => ({
  type: reportsConstants.ADD_COMMENT_SUCCESS,
});

export const addCommentFailure = () => ({
  type: reportsConstants.ADD_COMMENT_FAILURE,
});
