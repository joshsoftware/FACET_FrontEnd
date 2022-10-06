import { call, put, takeLatest } from 'redux-saga/effects';
import { getPayloadsSuccess } from './actions';
import { addPayloadApi, editPayloadApi, getPayloadsApi } from './apis';
import payloadConstants from './constants';
import { toast } from 'react-toastify';


export function* getPayloads({ payload }) {
    try {
        const response = yield call(getPayloadsApi, payload);
        yield put(getPayloadsSuccess(response.payloads));
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* addPayload({ payload }) {
    try {
        yield call(addPayloadApi, payload);
        toast.success("Payload Added Successfully!")
        yield call(getPayloads, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* editPayload({ payload }) {
    try {
        yield call(editPayloadApi, payload);
        toast.success("Payload Updated Successfully!")
        yield call(getPayloads, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.data.error)
    }
}

export default function* payloadSagas() {
    yield takeLatest(payloadConstants.GET_PAYLOADS_REQUEST, getPayloads);
    yield takeLatest(payloadConstants.ADD_PAYLOADS_REQUEST, addPayload);
    yield takeLatest(payloadConstants.EDIT_PAYLOADS_REQUEST, editPayload);
}