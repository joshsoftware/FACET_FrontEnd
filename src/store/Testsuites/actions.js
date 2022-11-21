import testsuiteConstants from "./constants";

export const getTestsuitesRequest = (data) => ({
    type: testsuiteConstants.GET_TESTSUITES_REQUEST,
    payload: data,
});

export const getTestsuitesSuccess = (data) => ({
    type: testsuiteConstants.GET_TESTSUITES_SUCCESS,
    payload: data,
});

export const getTestsuitesFailure = (data) => ({
    type: testsuiteConstants.GET_TESTSUITES_FAILURE,
    payload: data,
});

export const addTestsuiteRequest = (data) => ({
    type: testsuiteConstants.ADD_TESTSUITE_REQUEST,
    payload: data,
});

export const addTestsuiteSuccess = (data) => ({
    type: testsuiteConstants.ADD_TESTSUITE_SUCCESS,
    payload: data,
});

export const addTestsuiteFailure = (data) => ({
    type: testsuiteConstants.ADD_TESTSUITE_FAILURE,
    payload: data,
});

export const editTestsuiteRequest = (data) => ({
    type: testsuiteConstants.EDIT_TESTSUITE_REQUEST,
    payload: data,
});

export const editTestsuiteSuccess = (data) => ({
    type: testsuiteConstants.EDIT_TESTSUITE_SUCCESS,
    payload: data,
});

export const editTestsuiteFailure = (data) => ({
    type: testsuiteConstants.EDIT_TESTSUITE_FAILURE,
    payload: data,
});

export const deleteTestsuiteRequest = (data) => ({
    type: testsuiteConstants.DELETE_TESTSUITE_REQUEST,
    payload: data,
});

export const deleteTestsuiteSuccess = (data) => ({
    type: testsuiteConstants.DELETE_TESTSUITE_SUCCESS,
    payload: data,
});

export const deleteTestsuiteFailure = (data) => ({
    type: testsuiteConstants.DELETE_TESTSUITE_FAILURE,
    payload: data,
});
