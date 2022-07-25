import testcaseConstants from "./constants";

export const getTestcasesRequest = (data) => ({
    type: testcaseConstants.GET_TESTCASES_REQUEST,
    payload: data
})

export const getTestcasesSuccess = (data) => ({
    type: testcaseConstants.GET_TESTCASES_SUCCESS,
    payload: data
})

export const getTestcasesFailure = (data) => ({
    type: testcaseConstants.GET_TESTCASES_FAILURE,
    payload: data
})

export const addTestcasesRequest = (data) => ({
    type: testcaseConstants.ADD_TESTCASES_REQUEST,
    payload: data
})

export const addTestcasesSuccess = (data) => ({
    type: testcaseConstants.GET_TESTCASES_SUCCESS,
    payload: data
})

export const addTestcasesFailure = (data) => ({
    type: testcaseConstants.GET_TESTCASES_FAILURE,
    payload: data
})