import endpointConstants from "./constants";

export const getEndpointsRequest = (data) => ({
    type: endpointConstants.GET_ENDPOINT_REQUEST,
    payload: data
})

export const getEndpointsSuccess = (data) => ({
    type: endpointConstants.GET_ENDPOINT_SUCCESS,
    payload: data
})

export const getEndpointsFailure = (data) => ({
    type: endpointConstants.GET_ENDPOINT_FAILURE,
    payload: data
})

export const addEndpointsRequest = (data) => ({
    type: endpointConstants.ADD_ENDPOINT_REQUEST,
    payload: data
})

export const addEndpointsSuccess = (data) => ({
    type: endpointConstants.ADD_ENDPOINT_SUCCESS,
    payload: data
})

export const addEndpointsFailure = (data) => ({
    type: endpointConstants.ADD_ENDPOINT_FAILURE,
    payload: data
})

export const editEndpointsRequest = (data) => ({
    type: endpointConstants.EDIT_ENDPOINT_REQUEST,
    payload: data
})

export const editEndpointsSuccess = (data) => ({
    type: endpointConstants.EDIT_ENDPOINT_SUCCESS,
    payload: data
})

export const editEndpointsFailure = (data) => ({
    type: endpointConstants.EDIT_ENDPOINT_FAILURE,
    payload: data
})

export const deleteEndpointsRequest = (data) => ({
    type: endpointConstants.DELETE_ENDPOINT_REQUEST,
    payload: data
})

export const deleteEndpointsSuccess = (data) => ({
    type: endpointConstants.DELETE_ENDPOINT_SUCCESS,
    payload: data
})

export const deleteEndpointsFailure = (data) => ({
    type: endpointConstants.DELETE_ENDPOINT_FAILURE,
    payload: data
})