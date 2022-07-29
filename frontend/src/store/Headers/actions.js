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
    type: headerConstants.ADD_HEADERS_SUCCESS,
    payload: data
})

export const addHeadersFailure = (data) => ({
    type: headerConstants.ADD_HEADERS_FAILURE,
    payload: data
})

export const editHeadersRequest = (data) => ({
    type: headerConstants.EDIT_HEADERS_REQUEST,
    payload: data
})

export const editHeadersSuccess = (data) => ({
    type: headerConstants.EDIT_HEADERS_SUCCESS,
    payload: data
})

export const editHeadersFailure = (data) => ({
    type: headerConstants.EDIT_HEADERS_FAILURE,
    payload: data
})

export const deleteHeadersRequest = (data) => ({
    type: headerConstants.DELETE_HEADERS_REQUEST,
    payload: data
})

export const deleteHeadersSuccess = (data) => ({
    type: headerConstants.DELETE_HEADERS_SUCCESS,
    payload: data
})

export const deleteHeadersFailure = (data) => ({
    type: headerConstants.DELETE_HEADERS_FAILURE,
    payload: data
})