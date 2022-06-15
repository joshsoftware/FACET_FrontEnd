import { combineReducers } from "redux";
import endpointReducer from "./Endpoints/reducers";
import environmentReducer from "./Environments/reducers";
import headerReducer from "./Headers/reducers";
import payloadReducer from "./Payloads/reducers";
import projectReducer from "./Projects/reducers";
import testcaseReducer from "./Testcases/reducers";
import testsuiteReducer from "./Testsuites/reducers";
import userReducer from "./User/reducers";

const rootReducer = combineReducers({
    user: userReducer,
    projects: projectReducer,
    environments: environmentReducer,
    endpoints: endpointReducer,
    headers: headerReducer,
    payloads: payloadReducer,
    testcase: testcaseReducer,
    testsuite: testsuiteReducer
})

export default rootReducer;