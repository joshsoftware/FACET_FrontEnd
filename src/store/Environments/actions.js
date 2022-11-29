import environmentConstants from "./constants";

export const getEnvironmentsRequest = (data) => ({
  type: environmentConstants.GET_ENVIRONMENTS_REQUEST,
  payload: data,
});

export const getEnvironmentsSuccess = (data) => ({
  type: environmentConstants.GET_ENVIRONMENTS_SUCCESS,
  payload: data,
});

export const getEnvironmentsFailure = (data) => ({
  type: environmentConstants.GET_ENVIRONMENTS_FAILURE,
  payload: data,
});

export const addEnvironmentsRequest = (data) => ({
  type: environmentConstants.ADD_ENVIRONMENTS_REQUEST,
  payload: data,
});

export const addEnvironmentsSuccess = () => ({
  type: environmentConstants.ADD_ENVIRONMENTS_SUCCESS,
});

export const addEnvironmentsFailure = (data) => ({
  type: environmentConstants.ADD_ENVIRONMENTS_FAILURE,
  payload: data,
});

export const editEnvironmentsRequest = (data) => ({
  type: environmentConstants.EDIT_ENVIRONMENTS_REQUEST,
  payload: data,
});

export const editEnvironmentsSuccess = () => ({
  type: environmentConstants.EDIT_ENVIRONMENTS_SUCCESS,
});

export const editEnvironmentsFailure = (data) => ({
  type: environmentConstants.EDIT_ENVIRONMENTS_FAILURE,
  payload: data,
});

export const deleteEnvironmentsRequest = (data) => ({
  type: environmentConstants.DELETE_ENVIRONMENTS_REQUEST,
  payload: data,
});

export const deleteEnvironmentsSuccess = (data) => ({
  type: environmentConstants.DELETE_ENVIRONMENTS_SUCCESS,
  payload: data,
});

export const deleteEnvironmentsFailure = (data) => ({
  type: environmentConstants.DELETE_ENVIRONMENTS_FAILURE,
  payload: data,
});
