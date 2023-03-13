import testsuiteConstants from "./constants";

export const getTestsuitesRequest = (data) => ({
  type: testsuiteConstants.GET_TESTSUITES_REQUEST,
  payload: data,
});

export const getTestsuitesSuccess = (data) => ({
  type: testsuiteConstants.GET_TESTSUITES_SUCCESS,
  payload: data,
});

export const getTestsuitesFailure = () => ({
  type: testsuiteConstants.GET_TESTSUITES_FAILURE,
});

export const addTestsuiteRequest = (data) => ({
  type: testsuiteConstants.ADD_TESTSUITE_REQUEST,
  payload: data,
});

export const addTestsuiteSuccess = () => ({
  type: testsuiteConstants.ADD_TESTSUITE_SUCCESS,
});

export const addTestsuiteFailure = () => ({
  type: testsuiteConstants.ADD_TESTSUITE_FAILURE,
});

export const editTestsuiteRequest = (data) => ({
  type: testsuiteConstants.EDIT_TESTSUITE_REQUEST,
  payload: data,
});

export const editTestsuiteSuccess = () => ({
  type: testsuiteConstants.EDIT_TESTSUITE_SUCCESS,
});

export const editTestsuiteFailure = () => ({
  type: testsuiteConstants.EDIT_TESTSUITE_FAILURE,
});

export const deleteTestsuiteRequest = (data) => ({
  type: testsuiteConstants.DELETE_TESTSUITE_REQUEST,
  payload: data,
});

export const deleteTestsuiteSuccess = () => ({
  type: testsuiteConstants.DELETE_TESTSUITE_SUCCESS,
});

export const deleteTestsuiteFailure = () => ({
  type: testsuiteConstants.DELETE_TESTSUITE_FAILURE,
});
