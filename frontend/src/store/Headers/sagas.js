import { call, put, takeLatest } from 'redux-saga/effects';
import { getHeadersSuccess } from './actions';
import { addHeaderApi, getHeadersApi } from './apis';
import headerConstants from './constants';
import { toast } from 'react-toastify';


export function* getHeaders({ payload }) {
    try {
        const response = yield call(getHeadersApi, payload.project);
        yield put(getHeadersSuccess(response.headers));
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export function* addHeader({ payload }) {
    try {
        const response = yield call(addHeaderApi, payload);
        toast.success("Header Added Successfully!")
        yield call(getHeaders, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export default function* headerSagas() {
    yield takeLatest(headerConstants.GET_HEADERS_REQUEST, getHeaders);
    yield takeLatest(headerConstants.ADD_HEADERS_REQUEST, addHeader);
}