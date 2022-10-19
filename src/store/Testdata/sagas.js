import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { addTestdataApi, getTestdatasApi } from './apis';
import { getTestdataSuccess } from './actions';

import testdataConstants from './constants';


export function* getTestdatas({ payload }) {
    try {
        const response = yield call(getTestdatasApi, payload);
        yield put(getTestdataSuccess(response.testdata));
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* addTestdata({ payload }) {
    try {
        yield call(addTestdataApi, payload);
        toast.success("Testdata Added Successfully!")
        yield call(getTestdatas, {payload: { teststep: payload.teststep }});
    } catch (error) {
        toast.error(error.data.error)
    }
}

export default function* testdataSagas() {
    yield takeLatest(testdataConstants.GET_TESTDATA_REQUEST, getTestdatas);
    yield takeLatest(testdataConstants.ADD_TESTDATA_REQUEST, addTestdata);
}