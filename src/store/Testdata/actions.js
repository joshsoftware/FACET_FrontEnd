import testdataConstants from "./constants";

export const getTestdataRequest = (data) => ({
  type: testdataConstants.GET_TESTDATA_REQUEST,
  payload: data,
});

export const getTestdataSuccess = (data) => ({
  type: testdataConstants.GET_TESTDATA_SUCCESS,
  payload: data,
});

export const getTestdataFailure = () => ({
  type: testdataConstants.GET_TESTDATA_FAILURE,
});

export const addTestdataRequest = (data) => ({
  type: testdataConstants.ADD_TESTDATA_REQUEST,
  payload: data,
});

export const addTestdataSuccess = () => ({
  type: testdataConstants.GET_TESTDATA_SUCCESS,
});

export const addTestdataFailure = () => ({
  type: testdataConstants.GET_TESTDATA_FAILURE,
});

export const editTestdataRequest = (data) => ({
  type: testdataConstants.EDIT_TESTDATA_REQUEST,
  payload: data,
});

export const editTestdataSuccess = () => ({
  type: testdataConstants.EDIT_TESTDATA_SUCCESS,
});

export const editTestdataFailure = () => ({
  type: testdataConstants.EDIT_TESTDATA_FAILURE,
});

export const clearTestdataState = () => ({
  type: testdataConstants.CLEAR_TESTDATA_STATE,
});
