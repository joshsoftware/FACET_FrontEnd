import { call, put, takeLatest } from 'redux-saga/effects';
import { getEnvironmentsSuccess } from './actions';
import { addEnvironmentApi, getEnvironmentsApi } from './apis';
import environmentConstants from './constants';
import { toast } from 'react-toastify';

export function* getEnvironments({payload}) {
    try {
        const response = yield call(getEnvironmentsApi, payload.project)
        yield put(getEnvironmentsSuccess(response.environments))
    } catch (error) {
        toast.error(error.response.data.error)
    }
}

export function* addEnvironment({payload}){
    try {
        const response = yield call(addEnvironmentApi, payload)
        toast.success("Environment Added Successfully!")
        yield call(getEnvironments, {payload:{project: payload.project}});
    } catch (error) {
        toast.error(error.response.data.error)
    }
}

export default function* environmentSagas() {
    yield takeLatest(environmentConstants.GET_ENVIRONMENTS_REQUEST, getEnvironments);
    yield takeLatest(environmentConstants.ADD_ENVIRONMENTS_REQUEST, addEnvironment);
}