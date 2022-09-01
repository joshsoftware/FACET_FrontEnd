import { call, put, takeLatest } from 'redux-saga/effects';
import { getExecuteFailure, getExecuteSuccess } from './actions';
import { executeTestsuiteApi } from './apis';
import executeConstants from './constants';
import { toast } from 'react-toastify';


export function* getExecute({ payload }) {
    try {
        const response = yield call(executeTestsuiteApi, payload);
        yield put(getExecuteSuccess(response.result));
    } catch (error) {
        const err = error.data.error
        yield put(getExecuteFailure(err))
        let errMsg = Object.entries(err)[0]
        toast.error(`${errMsg[1].join(',')} in ${errMsg[0]}`)
    }
}

export function* addExecute({ payload }) {
    try {
        // yield put(addExecuteSuccess, payload);
        yield call(getExecute, {payload: { testsuite: payload.testsuite.id, environment: payload.environment }});
    } catch (error) {
        toast.error(error.data.error)
    }
}

export default function* executeSagas() {
    yield takeLatest(executeConstants.GET_EXECUTE_REQUEST, getExecute);
    yield takeLatest(executeConstants.ADD_EXECUTE_REQUEST, addExecute);
}