import testdataConstants from "./constants";

export const getTestdataRequest = (data) => ({
  type: testdataConstants.GET_TESTDATA_REQUEST,
  payload: data,
});

export const getTestdataSuccess = (data) => ({
  type: testdataConstants.GET_TESTDATA_SUCCESS,
  payload: data,
});

export const getTestdataFailure = (data) => ({
  type: testdataConstants.GET_TESTDATA_FAILURE,
  payload: data,
});

export const addTestdataRequest = (data) => ({
  type: testdataConstants.ADD_TESTDATA_REQUEST,
  payload: data,
});

export const addTestdataSuccess = (data) => ({
  type: testdataConstants.GET_TESTDATA_SUCCESS,
  payload: data,
});

export const addTestdataFailure = (data) => ({
  type: testdataConstants.GET_TESTDATA_FAILURE,
  payload: data,
});

export const uploadExcelRequest = (data) => ({
  type: testdataConstants.UPLOAD_EXCEL_REQUEST,
  payload: data,
});

export const uploadExcelSuccess = (data) => ({
  type: testdataConstants.UPLOAD_EXCEL_SUCCESS,
  payload: data,
});

export const uploadExcelFailure = (data) => ({
  type: testdataConstants.UPLOAD_EXCEL_FAILURE,
  payload: data,
});

export const downloadExcelRequest = (data) => ({
  type: testdataConstants.DOWNLOAD_EXCEL_REQUEST,
  payload: data,
});

export const downloadExcelSuccess = (data) => ({
  type: testdataConstants.DOWNLOAD_EXCEL_SUCCESS,
  payload: data,
});

export const downloadExcelFailure = (data) => ({
  type: testdataConstants.DOWNLOAD_EXCEL_FAILURE,
  payload: data,
});
