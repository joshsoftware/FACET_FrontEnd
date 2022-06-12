import { takeLatest, call, all, put } from 'redux-saga/effects';
import userConstants from "./userConstants";

export function* signIn({payload: {email, password}}) {
    console.log(email, password);
}

export function* signUp({payload}) {
    console.log(payload);
}


export function* onSignInStart() {
    yield takeLatest(userConstants.SIGN_IN_START, signIn)
}

export function* onSignUpStart() {
    yield takeLatest(userConstants.SIGN_UP_START, signUp)
}

export default function* userSagas() {
    yield all([
        call(onSignInStart),
        call(onSignUpStart)
    ])
}