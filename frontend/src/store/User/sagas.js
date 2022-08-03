import { toast } from 'react-toastify';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getAllUsersSuccess, signInSuccess, signOutSuccess } from './actions';
import { signInApi, signUpApi, getAllUsersApi } from './apis';
import userConstants from "./constants";

export function* signIn({payload}) {
    try {
        const response = yield call(signInApi, payload);
        toast.success("Login Successfully!");
        yield put(signInSuccess(response));
    } catch (error) {
        toast.error(error.response.data.error);
    }
}

export function* signUp({payload: {name, email, password, cpassword}}) {
    if(password!==cpassword){
        toast.error("Password Not Matched!");
        return
    }

    try {
        yield call(signUpApi, {name, email, password});
        toast.success("SignUp Successfully!");
    } catch (error) {
        toast.error(error.response.data.error)
    }
}

export function* signOut() {
    localStorage.removeItem('user');
    yield put(signOutSuccess());
    toast.success("Log out successfully!");
}

export function* getAllUsers({payload}) {
    try {
        const response = yield call(getAllUsersApi, payload);
        yield put(getAllUsersSuccess(response.users));
    } catch (error) {
        toast.error(error.response.data.errors)
    }
}


export default function* userSagas() {
    yield takeLatest(userConstants.SIGN_UP_START, signUp);
    yield takeLatest(userConstants.SIGN_IN_START, signIn);
    yield takeLatest(userConstants.SIGN_OUT_START, signOut);
    yield takeLatest(userConstants.GET_ALL_USERS_REQUEST, getAllUsers);
}