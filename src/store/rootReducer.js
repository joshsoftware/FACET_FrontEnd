import { combineReducers } from "redux";

import endpointReducer from "./Endpoints/reducers";
import environmentReducer from "./Environments/reducers";
import executeReducer from "./Execute/reducers";
import userReducer from "./User/reducers";
import headerReducer from "./Headers/reducers";
import payloadReducer from "./Payloads/reducers";
import projectMembersReducer from "./ProjectMembers/reducers";
import projectReducer from "./Projects/reducers";
import reportsReducer from "./Reports/reducers";
import scheduleReducer from "./Schedule/reducers";
import superAdminReducer from "./SuperAdmin/reducers";
import testcaseReducer from "./Testcases/reducers";
import testdataReducer from "./Testdata/reducers";
import teststepReducer from "./Teststeps/reducers";
import testsuiteReducer from "./Testsuites/reducers";
import organizationsReducer from "./Organizations/reducers";
import orgMembersReducer from "./Organizations/OrgMembers/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectReducer,
  environments: environmentReducer,
  endpoints: endpointReducer,
  headers: headerReducer,
  payloads: payloadReducer,
  teststeps: teststepReducer,
  testcases: testcaseReducer,
  testdata: testdataReducer,
  execute: executeReducer,
  projectMembers: projectMembersReducer,
  superAdmin: superAdminReducer,
  reports: reportsReducer,
  schedules: scheduleReducer,
  testsuites: testsuiteReducer,
  orgs: organizationsReducer,
  orgMembers: orgMembersReducer,
});

export default rootReducer;
