import testsuiteConstants from "./constants";

export const getTestsuitesRequest = (data) => ({
    type: testsuiteConstants.GET_TESTSUITES_REQUEST,
    payload: data
})

export const getTestsuitesSuccess = (data) => ({
    type: testsuiteConstants.GET_TESTSUITES_SUCCESS,
    payload: data
})

export const getTestsuitesFailure = (data) => ({
    type: testsuiteConstants.GET_TESTSUITES_FAILURE,
    payload: data
})

export const addTestsuitesRequest = (data) => ({
    type: testsuiteConstants.ADD_TESTSUITES_REQUEST,
    payload: data
})

export const editTestsuitesSuccess = (data) => ({
    type: testsuiteConstants.EDIT_TESTSUITES_SUCCESS,
    payload: data
})

export const editTestsuitesFailure = (data) => ({
    type: testsuiteConstants.EDIT_TESTSUITES_FAILURE,
    payload: data
})

export const editTestsuitesRequest = (data) => ({
    type: testsuiteConstants.EDIT_TESTSUITES_REQUEST,
    payload: data
})

export const deleteTestsuitesSuccess = (data) => ({
    type: testsuiteConstants.DELETE_TESTSUITES_SUCCESS,
    payload: data
})

export const deleteTestsuitesFailure = (data) => ({
    type: testsuiteConstants.DELETE_TESTSUITES_FAILURE,
    payload: data
})

export const deleteTestsuitesRequest = (data) => ({
    type: testsuiteConstants.DELETE_TESTSUITES_REQUEST,
    payload: data
})

export const addTestsuitesSuccess = (data) => ({
    type: testsuiteConstants.ADD_TESTSUITES_SUCCESS,
    payload: data
})

export const addTestsuitesFailure = (data) => ({
    type: testsuiteConstants.ADD_TESTSUITES_FAILURE,
    payload: data
})