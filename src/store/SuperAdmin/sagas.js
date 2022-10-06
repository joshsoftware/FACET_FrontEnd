import { call, takeLatest } from 'redux-saga/effects';
import { addAdminsApi } from './apis';
import superAdminConstants from './constants';
import { toast } from 'react-toastify';



export function* addAdmins({ payload }) {
    try {
        yield call(addAdminsApi, payload);
        toast.success("Admins Added Successfully!")
    } catch (error) {
        toast.error(error.data.error)
    }
}

export default function* superAdminSagas() {
    yield takeLatest(superAdminConstants.ADD_ADMINS_REQUEST, addAdmins);
}