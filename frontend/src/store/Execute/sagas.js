import { call, put, takeLatest } from 'redux-saga/effects';
import { getExecuteSuccess } from './actions';
import { executeTestsuiteApi } from './apis';
import executeConstants from './constants';
import { toast } from 'react-toastify';


export function* getExecute({ payload }) {
    try {
        const response = yield call(executeTestsuiteApi, payload);
        yield put(getExecuteSuccess(response.result));
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export function* addExecute({ payload }) {
    try {
        // yield put(addExecuteSuccess, payload);
        yield call(getExecute, {payload: { testsuite: payload.testsuite.id, environment: payload.environment }});
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export default function* executeSagas() {
    yield takeLatest(executeConstants.GET_EXECUTE_REQUEST, getExecute);
    yield takeLatest(executeConstants.ADD_EXECUTE_REQUEST, addExecute);
}