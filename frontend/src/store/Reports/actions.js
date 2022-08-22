import reportsConstants from "./constants";

export const getReportsRequest = (data) => ({
    type: reportsConstants.GET_REPORTS_REQUEST,
    payload: data
})

export const getReportsSuccess = (data) => ({
    type: reportsConstants.GET_REPORTS_SUCCESS,
    payload: data
})

export const getReportsFailure = (data) => ({
    type: reportsConstants.GET_REPORTS_FAILURE,
    payload: data
})

export const getSingleTestsuiteReportRequest = (data) => ({
    type: reportsConstants.GET_SINGLE_REPORT_REQUEST,
    payload: data
})

export const getSingleTestsuiteReportSuccess = (data) => ({
    type: reportsConstants.GET_SINGLE_REPORT_SUCCESS,
    payload: data
})

export const getSingleTestsuiteReportFailure = (data) => ({
    type: reportsConstants.GET_SINGLE_REPORT_FAILURE,
    payload: data
})

export const getSingleTestcaseOfTestsuiteReportRequest = (data) => ({
    type: reportsConstants.GET_TESTCASE_OF_SINGLE_REPORT_REQUEST,
    payload: data
})

export const getSingleTestcaseOfTestsuiteReportSuccess = (data) => ({
    type: reportsConstants.GET_TESTCASE_OF_SINGLE_REPORT_SUCCESS,
    payload: data
})

export const getSingleTestcaseOfTestsuiteReportFailure = (data) => ({
    type: reportsConstants.GET_TESTCASE_OF_SINGLE_REPORT_FAILURE,
    payload: data
})

export const addReportsRequest = (data) => ({
    type: reportsConstants.ADD_REPORTS_REQUEST,
    payload: data
})

export const addReportsSuccess = (data) => ({
    type: reportsConstants.ADD_REPORTS_SUCCESS,
    payload: data
})

export const addReportsFailure = (data) => ({
    type: reportsConstants.ADD_REPORTS_FAILURE,
    payload: data
})

export const editReportsRequest = (data) => ({
    type: reportsConstants.EDIT_REPORTS_REQUEST,
    payload: data
})

export const editReportsSuccess = (data) => ({
    type: reportsConstants.EDIT_REPORTS_SUCCESS,
    payload: data
})

export const editReportsFailure = (data) => ({
    type: reportsConstants.EDIT_REPORTS_FAILURE,
    payload: data
})

export const deleteReportsRequest = (data) => ({
    type: reportsConstants.DELETE_REPORTS_REQUEST,
    payload: data
})

export const deleteReportsSuccess = (data) => ({
    type: reportsConstants.DELETE_REPORTS_SUCCESS,
    payload: data
})

export const deleteReportsFailure = (data) => ({
    type: reportsConstants.DELETE_REPORTS_FAILURE,
    payload: data
})

export const addCommentRequest = (data) => ({
    type: reportsConstants.ADD_COMMENT_REQUEST,
    payload: data
})

export const addCommentSuccess = (data) => ({
    type: reportsConstants.ADD_COMMENT_SUCCESS,
    payload: data
})

export const addCommentFailure = (data) => ({
    type: reportsConstants.ADD_COMMENT_FAILURE,
    payload: data
})