import { call, put, takeLatest } from 'redux-saga/effects';
import { getEndpointsSuccess } from './actions';
import { addEndpointApi, getEndpointsApi } from './apis';
import endpointConstants from './constants';
import { toast } from 'react-toastify';

export function* getEndpoits({payload}) {
    try {
        const response = yield call(getEndpointsApi, payload.project);
        yield put(getEndpointsSuccess(response.endpoints))
    } catch (error) {
        toast.error(error.response.data.error)
    }
}

export function* addEndpoint({payload}){
    try {
        const response = yield call(addEndpointApi, payload);
        toast.success("Endpoint Added Successfully!");
        yield call(getEndpoits, {payload:{project: payload.project}})
    } catch (error) {
        toast.error(error.response.data.error)
    }
}


export default function* endpointSagas() {
    yield takeLatest(endpointConstants.GET_ENDPOINT_REQUEST, getEndpoits);
    yield takeLatest(endpointConstants.ADD_ENDPOINT_REQUEST, addEndpoint);
}