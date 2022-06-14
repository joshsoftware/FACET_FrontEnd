import { all, call } from 'redux-saga/effects';
import projectSagas from './Projects/sagas';
import userSagas from './User/sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(projectSagas)
    ])
}