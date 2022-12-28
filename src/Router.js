import { lazy } from "react";

import * as routes from "constants/routeConstants";

// public routes containers
const LoginContainer = lazy(() => import("containers/LoginContainer"));
const SignUpContainer = lazy(() => import("containers/SignUpContainer"));

// private routes containers
const DashBoard = lazy(() => import("containers/DashBoard"));
const Profile = lazy(() => import("containers/ProfileContainer"));
const MyOrganizations = lazy(() =>
  import("containers/OrganizationContainer/MyOrganizations")
);

// project routes containers
const ProjectOverview = lazy(() =>
  import("containers/ProjectContainer/ProjectOverviewContainer")
);
const Environment = lazy(() =>
  import("containers/ProjectContainer/EnvironmentContainer")
);
const Endpoint = lazy(() =>
  import("containers/ProjectContainer/EndpointContainer")
);
const Header = lazy(() =>
  import("containers/ProjectContainer/HeaderContainer")
);
const Payload = lazy(() =>
  import("containers/ProjectContainer/PayloadContainer")
);
const Teststep = lazy(() =>
  import("containers/ProjectContainer/TeststepContainer")
);
const Testcase = lazy(() =>
  import("containers/ProjectContainer/TestcaseContainer")
);
const Testsuite = lazy(() =>
  import("containers/ProjectContainer/TestsuiteContainer")
);
const Schedule = lazy(() =>
  import("containers/ProjectContainer/ScheduleContainer")
);
const Reports = lazy(() =>
  import("containers/ProjectContainer/ReportsContainer/ReportsContainer")
);
const ReportDetails = lazy(() =>
  import("containers/ProjectContainer/ReportsContainer/ReportDetailsContainer")
);
const Member = lazy(() =>
  import("containers/ProjectContainer/MemberContainer")
);
const Setting = lazy(() =>
  import("containers/ProjectContainer/SettingsContainer")
);

const addProps = { cat: "add" };
const editProps = { cat: "edit" };

export const publicRoutesConfig = [
  {
    key: "signup",
    path: routes.SIGNUP_ROUTE,
    component: SignUpContainer,
  },
  {
    key: "login",
    path: routes.LOGIN_ROUTE,
    component: LoginContainer,
  },
];

export const privateRoutesConfig = [
  {
    key: "dashboard",
    path: routes.DASHBOARD_ROUTE,
    component: DashBoard,
  },
  {
    key: "home",
    path: routes.ROOT_ROUTE,
    component: DashBoard,
  },
  {
    key: "user-profile",
    path: routes.USER_PROFILE_ROUTE,
    component: Profile,
  },
  {
    key: "my-organizations",
    path: routes.MY_ORGANIZATIONS_ROUTE,
    component: MyOrganizations,
  },
];

export const projectRoutesConfig = [
  {
    key: "project-overview",
    path: routes.PROJECT_OVERVIEW_ROUTE,
    component: ProjectOverview,
  },
  {
    key: "environments",
    path: routes.ENVIRONMENTS_ROUTE,
    component: Environment,
  },
  {
    key: "environment",
    path: routes.ENVIRONMENT_ROUTE,
    component: Environment,
  },
  {
    key: "add-environment",
    path: routes.ADD_ENVIRONMENT_ROUTE,
    component: Environment,
    props: addProps,
  },
  {
    key: "edit-environment",
    path: routes.EDIT_ENVIRONMENT_ROUTE,
    component: Environment,
    props: editProps,
  },
  {
    key: "endpoints",
    path: routes.ENDPOINTS_ROUTE,
    component: Endpoint,
  },
  {
    key: "endpoint",
    path: routes.ENDPOINT_ROUTE,
    component: Endpoint,
  },
  {
    key: "add-endpoint",
    path: routes.ADD_ENDPOINT_ROUTE,
    component: Endpoint,
    props: addProps,
  },
  {
    key: "edit-endpoint",
    path: routes.EDIT_ENDPOINT_ROUTE,
    component: Endpoint,
    props: editProps,
  },
  {
    key: "headers",
    path: routes.HEADERS_ROUTE,
    component: Header,
  },
  {
    key: "header",
    path: routes.HEADER_ROUTE,
    component: Header,
  },
  {
    key: "add-header",
    path: routes.ADD_HEADER_ROUTE,
    component: Header,
    props: addProps,
  },
  {
    key: "edit-header",
    path: routes.EDIT_HEADER_ROUTE,
    component: Header,
    props: editProps,
  },
  {
    key: "payloads",
    path: routes.PAYLOADS_ROUTE,
    component: Payload,
  },
  {
    key: "payload",
    path: routes.PAYLOAD_ROUTE,
    component: Payload,
  },
  {
    key: "add-payload",
    path: routes.ADD_PAYLOAD_ROUTE,
    component: Payload,
    props: addProps,
  },
  {
    key: "edit-payload",
    path: routes.EDIT_PAYLOAD_ROUTE,
    component: Payload,
    props: editProps,
  },
  {
    key: "teststeps",
    path: routes.TESTSTEPS_ROUTE,
    component: Teststep,
  },
  {
    key: "teststep",
    path: routes.TESTSTEP_ROUTE,
    component: Teststep,
  },
  {
    key: "add-teststep",
    path: routes.ADD_TESTSTEP_ROUTE,
    component: Teststep,
    props: addProps,
  },
  {
    key: "edit-teststep",
    path: routes.EDIT_TESTSTEP_ROUTE,
    component: Teststep,
    props: editProps,
  },
  {
    key: "testcases",
    path: routes.TESTCASES_ROUTE,
    component: Testcase,
  },
  {
    key: "testcase",
    path: routes.TESTCASE_ROUTE,
    component: Testcase,
  },
  {
    key: "add-testcase",
    path: routes.ADD_TESTCASE_ROUTE,
    component: Testcase,
    props: addProps,
  },
  {
    key: "edit-testcase",
    path: routes.EDIT_TESTCASE_ROUTE,
    component: Testcase,
    props: editProps,
  },
  {
    key: "testsuites",
    path: routes.TESTSUITES_ROUTE,
    component: Testsuite,
  },
  {
    key: "testsuite",
    path: routes.TESTSUITE_ROUTE,
    component: Testsuite,
  },
  {
    key: "add-testsuite",
    path: routes.ADD_TESTSUITE_ROUTE,
    component: Testsuite,
    props: addProps,
  },
  {
    key: "edit-testsuite",
    path: routes.EDIT_TESTSUITE_ROUTE,
    component: Testsuite,
    props: editProps,
  },
  {
    key: "schedules",
    path: routes.SCHEDULES_ROUTE,
    component: Schedule,
  },
  {
    key: "schdeule-form",
    path: routes.ADD_SCHEDULE_ROUTE,
    component: Schedule,
    props: addProps,
  },
  {
    key: "reports",
    path: routes.REPORTS_ROUTE,
    component: Reports,
  },
  {
    key: "report-details",
    path: routes.REPORT_ROUTE,
    component: ReportDetails,
  },
  {
    key: "members",
    path: routes.MEMBER_ROUTE,
    component: Member,
  },
  {
    key: "settings",
    path: routes.SETTING_ROUTE,
    component: Setting,
  },
];
