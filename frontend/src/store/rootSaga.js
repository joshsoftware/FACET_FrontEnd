import { all, call } from 'redux-saga/effects';
import endpointSagas from './Endpoints/sagas';
import environmentSagas from './Environments/sagas';
import projectSagas from './Projects/sagas';
import userSagas from './User/sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(projectSagas),
        call(environmentSagas),
        call(endpointSagas)
    ])
}