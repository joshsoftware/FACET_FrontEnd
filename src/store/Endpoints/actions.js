import endpointConstants from "./constants";

export const getEndpointsRequest = (data) => ({
  type: endpointConstants.GET_ENDPOINT_REQUEST,
  payload: data,
});

export const getEndpointsSuccess = (data) => ({
  type: endpointConstants.GET_ENDPOINT_SUCCESS,
  payload: data,
});

export const getEndpointsFailure = () => ({
  type: endpointConstants.GET_ENDPOINT_FAILURE,
});

export const addEndpointsRequest = (data) => ({
  type: endpointConstants.ADD_ENDPOINT_REQUEST,
  payload: data,
});

export const addEndpointsSuccess = () => ({
  type: endpointConstants.ADD_ENDPOINT_SUCCESS,
});

export const addEndpointsFailure = () => ({
  type: endpointConstants.ADD_ENDPOINT_FAILURE,
});

export const editEndpointsRequest = (data) => ({
  type: endpointConstants.EDIT_ENDPOINT_REQUEST,
  payload: data,
});

export const editEndpointsSuccess = () => ({
  type: endpointConstants.EDIT_ENDPOINT_SUCCESS,
});

export const editEndpointsFailure = () => ({
  type: endpointConstants.EDIT_ENDPOINT_FAILURE,
});

export const deleteEndpointsRequest = (data) => ({
  type: endpointConstants.DELETE_ENDPOINT_REQUEST,
  payload: data,
});

export const deleteEndpointsSuccess = () => ({
  type: endpointConstants.DELETE_ENDPOINT_SUCCESS,
});

export const deleteEndpointsFailure = (data) => ({
  type: endpointConstants.DELETE_ENDPOINT_FAILURE,
  payload: data,
});
