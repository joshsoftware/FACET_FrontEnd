import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getReportsSuccess, getSingleTestsuiteReportFailure, getSingleTestsuiteReportSuccess } from './actions';
import { getAllReportsApi } from './apis';
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


export default function* reportSagas() {
    yield takeLatest(reportsConstants.GET_REPORTS_REQUEST, getReports);
    yield takeLatest(reportsConstants.GET_SINGLE_REPORT_REQUEST, getSingleTestsuiteReport);
}