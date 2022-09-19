import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getExecuteFailure, getExecuteSuccess } from './actions';
import { executeTestcaseApi } from './apis';
import executeConstants from './constants';


export function* getExecute({ payload }) {
    try {
        const response = yield call(executeTestcaseApi, payload);
        yield put(getExecuteSuccess(response.result));
    } catch (error) {
        const err = error.data.error
        yield put(getExecuteFailure(err))
        if(typeof(err)==='object') {
            let errMsg = Object.entries(err)[0]
            toast.error(`${errMsg[1].join(',')} in ${errMsg[0]}`)
        } else {
            toast.error(err);
        }
    }
}

export function* addExecute({ payload }) {
    try {
        // yield put(addExecuteSuccess, payload);
        yield call(getExecute, {payload: { testcase: payload.testcase, environment: payload.environment }});
    } catch (error) {
        toast.error(error.data.error)
    }
}

export default function* executeSagas() {
    yield takeLatest(executeConstants.GET_EXECUTE_REQUEST, getExecute);
    yield takeLatest(executeConstants.ADD_EXECUTE_REQUEST, addExecute);
}