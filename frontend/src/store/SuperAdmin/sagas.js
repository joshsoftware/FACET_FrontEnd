import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllUsersSuccess } from './actions';
import { addAdminsApi, getAllUsersApi } from './apis';
import superAdminConstants from './constants';
import { toast } from 'react-toastify';


export function* getAllUsers(payload) {
    try {
        const response = yield call(getAllUsersApi, payload);
        yield put(getAllUsersSuccess(response.users));
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export function* addAdmins({ payload }) {
    try {
        console.log(payload)
        const response = yield call(addAdminsApi, payload);
        toast.success("Admins Added Successfully!")
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}

export default function* superAdminSagas() {
    yield takeLatest(superAdminConstants.GET_ALL_USERS_REQUEST, getAllUsers);
    yield takeLatest(superAdminConstants.ADD_ADMINS_REQUEST, addAdmins);
}