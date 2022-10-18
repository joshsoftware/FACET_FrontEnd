/* eslint-disable no-undef */
export const SERVER_URL = process.env.REACT_APP_BACKEND_URL;

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

export const BOOLEAN_SELECT_OPTION = [
  { value: true, label: 'True' },
  { value: false, label: 'False' },
];

export const EXPECTED_OUTCOME_TEMPLATE = {
  name: 'status_code',
  type: 'number',
  isExact: true,
  value: 200,
};

export const SELECT_OPTIONS_TESTDATA_FORM = {
  methods: [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'PATCH', label: 'PATCH' },
    { value: 'DELETE', label: 'DELETE' },
  ],
  endpoints: [],
  headers: [],
  payloads: [],
};

export const INITIAL_TESTSTEP_FORM_DATA = {
  name: '',
  method: '',
  endpoint_id: '',
  header_id: '',
  payload_id: '',
};

export const INITIAL_TESTDATA_FORM_DATA = {
  teststep: '',
  name: '',
  payload: {},
  parameters: { '': '' },
  selected_expected_outcome: '',
  expected_outcome: [],
};

export const INITIAL_PAYLOAD_FORM_DATA = {
  name: '',
  parameters: { '': '' },
  payload: JSON.stringify({}),
  expected_outcome: [],
};
