import { all, call } from 'redux-saga/effects';
import endpointSagas from './Endpoints/sagas';
import environmentSagas from './Environments/sagas';
import headerSagas from './Headers/sagas';
import payloadSagas from './Payloads/sagas';
import projectSagas from './Projects/sagas';
import testcaseSagas from './Testcases/sagas';
import testsuiteSagas from './Testsuites/sagas';
import userSagas from './User/sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(projectSagas),
        call(environmentSagas),
        call(endpointSagas),
        call(headerSagas),
        call(payloadSagas),
        call(testcaseSagas),
        call(testsuiteSagas)
    ])
}