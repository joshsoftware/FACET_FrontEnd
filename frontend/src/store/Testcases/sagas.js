import { call, put, takeLatest } from 'redux-saga/effects';
import { getTestcasesSuccess } from './actions';
import { addTestcaseApi, editTestcaseApi, getTestcasesApi } from './apis';
import testcaseConstants from './constants';
import { toast } from 'react-toastify';


export function* getTestcases({ payload }) {
    try {
        const response = yield call(getTestcasesApi, payload);
        yield put(getTestcasesSuccess(response.testcases));
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* addTestcase({ payload }) {
    try {
        yield call(addTestcaseApi, payload);
        toast.success("Testcase Added Successfully!")
        yield call(getTestcases, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* editTestcase({ payload }) {
    try {
        yield call(editTestcaseApi, payload);
        toast.success("Testcase Updated Successfully!")
        yield call(getTestcases, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.data.error)
    }
}

export default function* testcaseSagas() {
    yield takeLatest(testcaseConstants.GET_TESTCASES_REQUEST, getTestcases);
    yield takeLatest(testcaseConstants.ADD_TESTCASES_REQUEST, addTestcase);
    yield takeLatest(testcaseConstants.EDIT_TESTCASES_REQUEST, editTestcase);
}