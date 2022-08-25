import { combineReducers } from "redux";
import endpointReducer from "./Endpoints/reducers";
import environmentReducer from "./Environments/reducers";
import executeReducer from "./Execute/reducers";
import headerReducer from "./Headers/reducers";
import payloadReducer from "./Payloads/reducers";
import { projectReducer, projectMemberReducer } from "./Projects/reducers";
import reportsReducer from "./Reports/reducers";
import scheduleReducer from "./Schedule/reducers";
import superAdminReducer from "./SuperAdmin/reducers";
import testcaseReducer from "./Testcases/reducers";
import testdataReducer from "./Testdata/reducers";
import testsuiteReducer from "./Testsuites/reducers";
import { getUsersReducer, userReducer } from "./User/reducers";

const rootReducer = combineReducers({
    user: userReducer,
    projects: projectReducer,
    environments: environmentReducer,
    endpoints: endpointReducer,
    headers: headerReducer,
    payloads: payloadReducer,
    testcases: testcaseReducer,
    testsuites: testsuiteReducer,
    testdata: testdataReducer,
    execute: executeReducer,
    projectMembers: projectMemberReducer,
    superAdmin: superAdminReducer,
    getUsers: getUsersReducer,
    reports: reportsReducer,
    schedules: scheduleReducer
})

export default rootReducer;