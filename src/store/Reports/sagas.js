import { call, put, takeLatest, select } from 'redux-saga/effects';
import { 
    addCommentFailure, 
    addCommentSuccess, 
    getReportsSuccess, 
    getSingleTeststepOfTestcaseReportFailure, 
    getSingleTeststepOfTestcaseReportSuccess, 
    getSingleTestcaseReportFailure, 
    getSingleTestcaseReportSuccess 
} from './actions';
import { addCommentApi, getAllReportsApi } from './apis';
import reportsConstants from './constants';
import { toast } from 'react-toastify';


export function* getReports({ payload }) {
    try {
        const response = yield call(getAllReportsApi, payload);
        yield put(getReportsSuccess(response.results));
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* getSingleTestcaseReport({ payload }) {
    try {
        const reports = yield select(state => state.reports.reports);
        const oneReport = reports.find(x => String(x.id)===String(payload.reportId));
        if (oneReport) {
            yield put(getSingleTestcaseReportSuccess(oneReport));
        } else {
            throw "Report Not Found"
        }
    } catch (error) {
        yield put(getSingleTestcaseReportFailure(error))
        toast.error(error)
    }
}

export function* getTeststepOfSingleTestcaseReport({ payload }) {
    try {
        const singleSuiteReport = yield select(state => state.reports.singleReport.teststeps);
        const testcaseReport = singleSuiteReport.find(x => String(x.name)===String(payload.testcaseName));
        if (testcaseReport) {
            yield put(getSingleTeststepOfTestcaseReportSuccess(testcaseReport));
        } else {
            throw "Report Not Found"
        }
    } catch (error) {
        yield put(getSingleTeststepOfTestcaseReportFailure(error))
        toast.error(error)
    }
}

export function* addComment({ payload }) {
    try {
        yield call(addCommentApi, payload);
        yield put(addCommentSuccess());
        yield call(getReports, { payload: { project: payload.project } })
        toast.success("Comment Added Successfully!")
    } catch (error) {
        yield put(addCommentFailure(error));
        toast.error("Something Went Wrong!");

    }
}

export default function* reportSagas() {
    yield takeLatest(reportsConstants.GET_REPORTS_REQUEST, getReports);
    yield takeLatest(reportsConstants.GET_SINGLE_REPORT_REQUEST, getSingleTestcaseReport);
    yield takeLatest(reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_REQUEST, getTeststepOfSingleTestcaseReport);
    yield takeLatest(reportsConstants.ADD_COMMENT_REQUEST, addComment);
}