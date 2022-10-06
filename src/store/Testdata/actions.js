import testdataConstants from "./constants";

export const getTestdataRequest = (data) => ({
    type: testdataConstants.GET_TESTDATA_REQUEST,
    payload: data
})

export const getTestdataSuccess = (data) => ({
    type: testdataConstants.GET_TESTDATA_SUCCESS,
    payload: data
})

export const getTestdataFailure = (data) => ({
    type: testdataConstants.GET_TESTDATA_FAILURE,
    payload: data
})

export const addTestdataRequest = (data) => ({
    type: testdataConstants.ADD_TESTDATA_REQUEST,
    payload: data
})

export const addTestdataSuccess = (data) => ({
    type: testdataConstants.GET_TESTDATA_SUCCESS,
    payload: data
})

export const addTestdataFailure = (data) => ({
    type: testdataConstants.GET_TESTDATA_FAILURE,
    payload: data
})