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

export const addEnvironmentsFailure = () => ({
  type: environmentConstants.ADD_ENVIRONMENTS_FAILURE,
});

export const editEnvironmentsRequest = (data) => ({
  type: environmentConstants.EDIT_ENVIRONMENTS_REQUEST,
  payload: data,
});

export const editEnvironmentsSuccess = () => ({
  type: environmentConstants.EDIT_ENVIRONMENTS_SUCCESS,
});

export const editEnvironmentsFailure = () => ({
  type: environmentConstants.EDIT_ENVIRONMENTS_FAILURE,
});

export const deleteEnvironmentsRequest = (data) => ({
  type: environmentConstants.DELETE_ENVIRONMENTS_REQUEST,
  payload: data,
});

export const deleteEnvironmentsSuccess = () => ({
  type: environmentConstants.DELETE_ENVIRONMENTS_SUCCESS,
});

export const deleteEnvironmentsFailure = () => ({
  type: environmentConstants.DELETE_ENVIRONMENTS_FAILURE,
});
