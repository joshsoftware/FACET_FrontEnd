import { call, put, takeLatest } from 'redux-saga/effects';
import { getEndpointsSuccess } from './actions';
import { addEndpointApi, editEndpointApi, getEndpointsApi } from './apis';
import endpointConstants from './constants';
import { toast } from 'react-toastify';

export function* getEndpoits({payload}) {
    try {
        const response = yield call(getEndpointsApi, payload);
        yield put(getEndpointsSuccess(response.endpoints))
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* addEndpoint({payload}){
    try {
        yield call(addEndpointApi, payload);
        toast.success("Endpoint Added Successfully!");
        yield call(getEndpoits, {payload:{project: payload.project}})
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* editEndpoint({payload}){
    try {
        yield call(editEndpointApi, payload);
        toast.success("Endpoint Updated Successfully!");
        yield call(getEndpoits, {payload:{project: payload.project}})
    } catch (error) {
        toast.error(error.data.error)
    }
}


export default function* endpointSagas() {
    yield takeLatest(endpointConstants.GET_ENDPOINT_REQUEST, getEndpoits);
    yield takeLatest(endpointConstants.ADD_ENDPOINT_REQUEST, addEndpoint);
    yield takeLatest(endpointConstants.EDIT_ENDPOINT_REQUEST, editEndpoint);
}