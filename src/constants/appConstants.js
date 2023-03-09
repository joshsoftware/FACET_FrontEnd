/* eslint-disable no-undef */
export const SERVER_URL = process.env.REACT_APP_BACKEND_URL;

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

export const BOOLEAN_SELECT_OPTION = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];

export const EXPECTED_OUTCOME_TEMPLATE = {
  name: "status_code",
  type: "number",
  isExact: true,
  value: 200,
};

export const HTTP_METHODS_OPTIONS = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "PATCH", label: "PATCH" },
  { value: "DELETE", label: "DELETE" },
];

export const SELECT_OPTIONS_TESTDATA_FORM = {
  methods: [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "PATCH", label: "PATCH" },
    { value: "DELETE", label: "DELETE" },
  ],
  endpoints: [],
  headers: [],
  payloads: [],
};

export const INITIAL_TESTSTEP_FORM_DATA = {
  name: "",
  method: "",
  endpoint: "",
  header: "",
  payload: "",
};

export const INITIAL_TESTDATA_FORM_DATA = {
  teststep: "",
  name: "",
  payload: JSON.stringify({}),
  parameters: [{ "": "" }],
  selectedExpOutcome: null,
  expectedOutcome: [],
};

export const INITIAL_PAYLOAD_FORM_DATA = {
  name: "",
  parameters: [{ "": "" }],
  payload: JSON.stringify({}),
  expectedOutcome: [],
};

export const INITIAL_TESTSUITE_FORM_DATA = {
  name: "",
  testcases: [],
};

export const STATUS_OPTIONS = [
  { label: "Passed", value: "passed" },
  { label: "Failed", value: "failed" },
];

export const PARAMETERS_TABLE_HEADINGS = ["Key", "Value"];

export const EXPECTED_OUTCOME_TABLE_HEADINGS = [
  "#",
  "Name",
  "Type",
  "isExact",
  "Value",
  "Validations",
];

// set maximum length for input name field
export const NAME_FIELD_MAX_LENGTH = 50;

export const DATE_TIME_FORMAT = "DD/MM/YYYY hh:mm A";
