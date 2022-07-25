import headerConstants from "./constants";

export const getHeadersRequest = (data) => ({
    type: headerConstants.GET_HEADERS_REQUEST,
    payload: data
})

export const getHeadersSuccess = (data) => ({
    type: headerConstants.GET_HEADERS_SUCCESS,
    payload: data
})

export const getHeadersFailure = (data) => ({
    type: headerConstants.GET_HEADERS_FAILURE,
    payload: data
})

export const addHeadersRequest = (data) => ({
    type: headerConstants.ADD_HEADERS_REQUEST,
    payload: data
})

export const addHeadersSuccess = (data) => ({
    type: headerConstants.GET_HEADERS_SUCCESS,
    payload: data
})

export const addHeadersFailure = (data) => ({
    type: headerConstants.GET_HEADERS_FAILURE,
    payload: data
})