import { all, call } from "redux-saga/effects";

import endpointSagas from "./Endpoints/sagas";
import environmentSagas from "./Environments/sagas";
import executeSagas from "./Execute/sagas";
import headerSagas from "./Headers/sagas";
import payloadSagas from "./Payloads/sagas";
import projectSagas from "./Projects/sagas";
import reportSagas from "./Reports/sagas";
import scheduleSagas from "./Schedule/sagas";
import superAdminSagas from "./SuperAdmin/sagas";
import testcaseSagas from "./Testcases/sagas";
import testdataSagas from "./Testdata/sagas";
import teststepSagas from "./Teststeps/sagas";
import testsuiteSagas from "./Testsuites/sagas";
import userSagas from "./User/sagas";

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(projectSagas),
    call(environmentSagas),
    call(endpointSagas),
    call(headerSagas),
    call(payloadSagas),
    call(teststepSagas),
    call(testcaseSagas),
    call(testdataSagas),
    call(executeSagas),
    call(superAdminSagas),
    call(reportSagas),
    call(scheduleSagas),
    call(testsuiteSagas),
  ]);
}
