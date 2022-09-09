import { call, put, takeLatest } from 'redux-saga/effects';
import { getTeststepsSuccess } from './actions';
import { addTeststepApi, editTeststepApi, getTeststepsApi } from './apis';
import teststepConstants from './constants';
import { toast } from 'react-toastify';


export function* getTeststeps({ payload }) {
    try {
        const response = yield call(getTeststepsApi, payload);
        yield put(getTeststepsSuccess(response.teststeps));
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* addTeststep({ payload }) {
    try {
        yield call(addTeststepApi, payload);
        toast.success("Teststep Added Successfully!")
        yield call(getTeststeps, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* editTeststep({ payload }) {
    try {
        yield call(editTeststepApi, payload);
        toast.success("Teststep Updated Successfully!")
        yield call(getTeststeps, {payload: { project: payload.project }});
    } catch (error) {
        toast.error(error.data.error)
    }
}


export default function* teststepSagas() {
    yield takeLatest(teststepConstants.GET_TESTSTEPS_REQUEST, getTeststeps);
    yield takeLatest(teststepConstants.ADD_TESTSTEPS_REQUEST, addTeststep);
    yield takeLatest(teststepConstants.EDIT_TESTSTEPS_REQUEST, editTeststep);
}