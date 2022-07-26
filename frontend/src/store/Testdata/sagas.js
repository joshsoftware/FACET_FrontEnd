import { call, put, takeLatest } from 'redux-saga/effects';
import { getTestdataSuccess } from './actions';
import { addTestdataApi, getTestdatasApi } from './apis';
import testdataConstants from './constants';
import { toast } from 'react-toastify';


export function* getTestdatas({ payload }) {
    try {
        const response = yield call(getTestdatasApi, payload.testcase);
        yield put(getTestdataSuccess(response.testdata));
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export function* addTestdata({ payload }) {
    try {
        const response = yield call(addTestdataApi, payload);
        toast.success("Testdata Added Successfully!")
        console.log("q")
        yield call(getTestdatas, {payload: { testcase: payload.testcase }});
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export default function* testdataSagas() {
    yield takeLatest(testdataConstants.GET_TESTDATA_REQUEST, getTestdatas);
    yield takeLatest(testdataConstants.ADD_TESTDATA_REQUEST, addTestdata);
}