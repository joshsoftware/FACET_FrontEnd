import { call, put, takeLatest } from 'redux-saga/effects';
import { getTestsuitesSuccess } from './actions';
import { addTestsuiteApi, editTestsuiteApi, getTestsuitesApi } from './apis';
import testsuiteConstants from './constants';
import { toast } from 'react-toastify';


export function* getTestsuites({ payload }) {
    try {
        const response = yield call(getTestsuitesApi, payload.project);
        yield put(getTestsuitesSuccess(response.testsuites));
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export function* addTestsuite({ payload }) {
    try {
        yield call(addTestsuiteApi, payload);
        toast.success("Testsuite Added Successfully!")
        yield call(getTestsuites, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export function* editTestsuite({ payload }) {
    try {
        yield call(editTestsuiteApi, payload);
        toast.success("Testsuite Updated Successfully!")
        yield call(getTestsuites, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export default function* testsuiteSagas() {
    yield takeLatest(testsuiteConstants.GET_TESTSUITES_REQUEST, getTestsuites);
    yield takeLatest(testsuiteConstants.ADD_TESTSUITES_REQUEST, addTestsuite);
    yield takeLatest(testsuiteConstants.EDIT_TESTSUITES_REQUEST, editTestsuite);
}