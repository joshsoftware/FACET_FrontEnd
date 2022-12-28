// root route
export const ROOT_ROUTE = "/";

// public routes constants
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";

// private route constants
export const DASHBOARD_ROUTE = "/dashboard";
export const USER_PROFILE_ROUTE = "/profile";
export const MY_ORGANIZATIONS_ROUTE = "/organizations";
export const ADD_ORGANIZATION_ROUTE = "/organization/new";

// organizations routes
export const ORG_OVERVIEW_ROUTE = "/orgs/:org";

// project routes contants
const projectRoutePrefix = "/project/:projectName";
// project overview route
export const PROJECT_OVERVIEW_ROUTE = projectRoutePrefix;
// environments route constants
export const ENVIRONMENTS_ROUTE = `${projectRoutePrefix}/environments`;
export const ENVIRONMENT_ROUTE = `${projectRoutePrefix}/environments/:id`;
export const ADD_ENVIRONMENT_ROUTE = `${projectRoutePrefix}/environments/new`;
export const EDIT_ENVIRONMENT_ROUTE = `${projectRoutePrefix}/environments/edit/:id`;
// endpoints route constants
export const ENDPOINTS_ROUTE = `${projectRoutePrefix}/endpoints`;
export const ENDPOINT_ROUTE = `${projectRoutePrefix}/endpoints/:id`;
export const ADD_ENDPOINT_ROUTE = `${projectRoutePrefix}/endpoints/new`;
export const EDIT_ENDPOINT_ROUTE = `${projectRoutePrefix}/endpoints/edit/:id`;
// headers route constants
export const HEADERS_ROUTE = `${projectRoutePrefix}/headers`;
export const HEADER_ROUTE = `${projectRoutePrefix}/headers/:id`;
export const ADD_HEADER_ROUTE = `${projectRoutePrefix}/headers/new`;
export const EDIT_HEADER_ROUTE = `${projectRoutePrefix}/headers/edit/:id`;
// payloads route constants
export const PAYLOADS_ROUTE = `${projectRoutePrefix}/payloads`;
export const PAYLOAD_ROUTE = `${projectRoutePrefix}/payloads/:id`;
export const ADD_PAYLOAD_ROUTE = `${projectRoutePrefix}/payloads/new`;
export const EDIT_PAYLOAD_ROUTE = `${projectRoutePrefix}/payloads/edit/:id`;
// teststeps route constants
export const TESTSTEPS_ROUTE = `${projectRoutePrefix}/teststeps`;
export const TESTSTEP_ROUTE = `${projectRoutePrefix}/teststeps/:id`;
export const ADD_TESTSTEP_ROUTE = `${projectRoutePrefix}/teststeps/new`;
export const EDIT_TESTSTEP_ROUTE = `${projectRoutePrefix}/teststeps/edit/:id`;
// testcases route constants
export const TESTCASES_ROUTE = `${projectRoutePrefix}/testcases`;
export const TESTCASE_ROUTE = `${projectRoutePrefix}/testcases/:id`;
export const ADD_TESTCASE_ROUTE = `${projectRoutePrefix}/testcases/new`;
export const EDIT_TESTCASE_ROUTE = `${projectRoutePrefix}/testcases/edit/:id`;
// testsuites route constants
export const TESTSUITES_ROUTE = `${projectRoutePrefix}/testsuites`;
export const TESTSUITE_ROUTE = `${projectRoutePrefix}/testsuites/:id`;
export const ADD_TESTSUITE_ROUTE = `${projectRoutePrefix}/testsuites/new`;
export const EDIT_TESTSUITE_ROUTE = `${projectRoutePrefix}/testsuites/edit/:id`;
// schedule route constants
export const SCHEDULES_ROUTE = `${projectRoutePrefix}/schedule`;
export const ADD_SCHEDULE_ROUTE = `${projectRoutePrefix}/schedule/new`;
// reports route constants
export const REPORTS_ROUTE = `${projectRoutePrefix}/reports`;
export const REPORT_ROUTE = `${projectRoutePrefix}/reports/:reportId`;
// settings route constants
export const SETTING_ROUTE = `${projectRoutePrefix}/settings`;
// members route constants
export const MEMBER_ROUTE = `${projectRoutePrefix}/members`;
// execute route constants
export const EXECUTE_ROUTE = `${projectRoutePrefix}/execute/:id`;
