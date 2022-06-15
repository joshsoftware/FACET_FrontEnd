import { call, put, takeLatest } from 'redux-saga/effects';
import { getPayloadsSuccess } from './actions';
import { addPayloadApi, getPayloadsApi } from './apis';
import payloadConstants from './constants';
import { toast } from 'react-toastify';


export function* getPayloads({ payload }) {
    try {
        const response = yield call(getPayloadsApi, payload.project);
        yield put(getPayloadsSuccess(response.payloads));
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export function* addPayload({ payload }) {
    try {
        const response = yield call(addPayloadApi, payload);
        toast.success("Payload Added Successfully!")
        yield call(getPayloads, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export default function* payloadSagas() {
    yield takeLatest(payloadConstants.GET_PAYLOADS_REQUEST, getPayloads);
    yield takeLatest(payloadConstants.ADD_PAYLOADS_REQUEST, addPayload);
}