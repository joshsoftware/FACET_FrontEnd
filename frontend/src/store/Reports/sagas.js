import { call, put, takeLatest, select } from 'redux-saga/effects';
import { addCommentFailure, addCommentSuccess, getReportsSuccess, getSingleTestcaseOfTestsuiteReportFailure, getSingleTestcaseOfTestsuiteReportRequest, getSingleTestcaseOfTestsuiteReportSuccess, getSingleTestsuiteReportFailure, getSingleTestsuiteReportSuccess } from './actions';
import { addCommentApi, getAllReportsApi } from './apis';
import reportsConstants from './constants';
import { toast } from 'react-toastify';


export function* getReports({ payload }) {
    try {
        const response = yield call(getAllReportsApi, payload.project);
        yield put(getReportsSuccess(response.results));
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export function* getSingleTestsuiteReport({ payload }) {
    try {
        const reports = yield select(state => state.reports.reports);
        const oneReport = reports.find(x => String(x.id)===String(payload.reportId));
        if (oneReport) {
            yield put(getSingleTestsuiteReportSuccess(oneReport));
        } else {
            throw "Report Not Found"
        }
    } catch (error) {
        yield put(getSingleTestsuiteReportFailure(error))
        toast.error(error)
    }
}

export function* getTestcaseOfSingleTestsuiteReport({ payload }) {
    try {
        const singleSuiteReport = yield select(state => state.reports.singleReport.testcases.testcases);
        const testcaseReport = singleSuiteReport.find(x => String(x.name)===String(payload.testcaseName));
        if (testcaseReport) {
            yield put(getSingleTestcaseOfTestsuiteReportSuccess(testcaseReport));
        } else {
            throw "Report Not Found"
        }
    } catch (error) {
        yield put(getSingleTestcaseOfTestsuiteReportFailure(error))
        toast.error(error)
    }
}

export function* addComment({ payload }) {
    try {
        const response = yield call(addCommentApi, payload);
        yield put(addCommentSuccess());
        toast.success("Comment Added Successfully!")
    } catch (error) {
        yield put(addCommentFailure(error));
        toast.error("Something Went Wrong!");

    }
}

export default function* reportSagas() {
    yield takeLatest(reportsConstants.GET_REPORTS_REQUEST, getReports);
    yield takeLatest(reportsConstants.GET_SINGLE_REPORT_REQUEST, getSingleTestsuiteReport);
    yield takeLatest(reportsConstants.GET_TESTCASE_OF_SINGLE_REPORT_REQUEST, getTestcaseOfSingleTestsuiteReport);
    yield takeLatest(reportsConstants.ADD_COMMENT_REQUEST, addComment);
}