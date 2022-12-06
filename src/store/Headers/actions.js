import headerConstants from "./constants";

export const getHeadersRequest = (data) => ({
  type: headerConstants.GET_HEADERS_REQUEST,
  payload: data,
});

export const getHeadersSuccess = (data) => ({
  type: headerConstants.GET_HEADERS_SUCCESS,
  payload: data,
});

export const getHeadersFailure = () => ({
  type: headerConstants.GET_HEADERS_FAILURE,
});

export const addHeadersRequest = (data) => ({
  type: headerConstants.ADD_HEADERS_REQUEST,
  payload: data,
});

export const addHeadersSuccess = () => ({
  type: headerConstants.ADD_HEADERS_SUCCESS,
});

export const addHeadersFailure = () => ({
  type: headerConstants.ADD_HEADERS_FAILURE,
});

export const editHeadersRequest = (data) => ({
  type: headerConstants.EDIT_HEADERS_REQUEST,
  payload: data,
});

export const editHeadersSuccess = () => ({
  type: headerConstants.EDIT_HEADERS_SUCCESS,
});

export const editHeadersFailure = () => ({
  type: headerConstants.EDIT_HEADERS_FAILURE,
});

export const deleteHeadersRequest = (data) => ({
  type: headerConstants.DELETE_HEADERS_REQUEST,
  payload: data,
});

export const deleteHeadersSuccess = () => ({
  type: headerConstants.DELETE_HEADERS_SUCCESS,
});

export const deleteHeadersFailure = () => ({
  type: headerConstants.DELETE_HEADERS_FAILURE,
});
