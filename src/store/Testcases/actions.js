import testcaseConstants from "./constants";

export const getTestcasesRequest = (data) => ({
  type: testcaseConstants.GET_TESTCASES_REQUEST,
  payload: data,
});

export const getTestcasesSuccess = (data) => ({
  type: testcaseConstants.GET_TESTCASES_SUCCESS,
  payload: data,
});

export const getTestcasesFailure = () => ({
  type: testcaseConstants.GET_TESTCASES_FAILURE,
});

export const addTestcasesRequest = (data) => ({
  type: testcaseConstants.ADD_TESTCASES_REQUEST,
  payload: data,
});

export const addTestcasesSuccess = () => ({
  type: testcaseConstants.ADD_TESTCASES_SUCCESS,
});

export const addTestcasesFailure = () => ({
  type: testcaseConstants.ADD_TESTCASES_FAILURE,
});

export const editTestcasesRequest = (data) => ({
  type: testcaseConstants.EDIT_TESTCASES_REQUEST,
  payload: data,
});

export const editTestcasesSuccess = () => ({
  type: testcaseConstants.EDIT_TESTCASES_SUCCESS,
});

export const editTestcasesFailure = () => ({
  type: testcaseConstants.EDIT_TESTCASES_FAILURE,
});

export const deleteTestcasesRequest = (data) => ({
  type: testcaseConstants.DELETE_TESTCASES_REQUEST,
  payload: data,
});

export const deleteTestcasesSuccess = () => ({
  type: testcaseConstants.DELETE_TESTCASES_SUCCESS,
});

export const deleteTestcasesFailure = () => ({
  type: testcaseConstants.DELETE_TESTCASES_FAILURE,
});
