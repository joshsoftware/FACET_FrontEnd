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

export const editTestcasesSuccess = (data) => ({
    type: testcaseConstants.EDIT_TESTCASES_SUCCESS,
    payload: data
})

export const editTestcasesFailure = (data) => ({
    type: testcaseConstants.EDIT_TESTCASES_FAILURE,
    payload: data
})

export const editTestcasesRequest = (data) => ({
    type: testcaseConstants.EDIT_TESTCASES_REQUEST,
    payload: data
})

export const deleteTestcasesSuccess = (data) => ({
    type: testcaseConstants.DELETE_TESTCASES_SUCCESS,
    payload: data
})

export const deleteTestcasesFailure = (data) => ({
    type: testcaseConstants.DELETE_TESTCASES_FAILURE,
    payload: data
})

export const deleteTestcasesRequest = (data) => ({
    type: testcaseConstants.DELETE_TESTCASES_REQUEST,
    payload: data
})

export const addTestcasesSuccess = (data) => ({
    type: testcaseConstants.ADD_TESTCASES_SUCCESS,
    payload: data
})

export const addTestcasesFailure = (data) => ({
    type: testcaseConstants.ADD_TESTCASES_FAILURE,
    payload: data
})