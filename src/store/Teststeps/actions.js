import teststepConstants from "./constants";

export const getTeststepsRequest = (data) => ({
  type: teststepConstants.GET_TESTSTEPS_REQUEST,
  payload: data,
});

export const getTeststepsSuccess = (data) => ({
  type: teststepConstants.GET_TESTSTEPS_SUCCESS,
  payload: data,
});

export const getTeststepsFailure = () => ({
  type: teststepConstants.GET_TESTSTEPS_FAILURE,
});

export const addTeststepsRequest = (data) => ({
  type: teststepConstants.ADD_TESTSTEPS_REQUEST,
  payload: data,
});

export const addTeststepsSuccess = () => ({
  type: teststepConstants.ADD_TESTSTEPS_SUCCESS,
});

export const addTeststepsFailure = () => ({
  type: teststepConstants.ADD_TESTSTEPS_FAILURE,
});

export const editTeststepsRequest = (data) => ({
  type: teststepConstants.EDIT_TESTSTEPS_REQUEST,
  payload: data,
});

export const editTeststepsSuccess = () => ({
  type: teststepConstants.EDIT_TESTSTEPS_SUCCESS,
});

export const editTeststepsFailure = () => ({
  type: teststepConstants.EDIT_TESTSTEPS_FAILURE,
});

export const deleteTeststepsRequest = (data) => ({
  type: teststepConstants.DELETE_TESTSTEPS_REQUEST,
  payload: data,
});

export const deleteTeststepsSuccess = () => ({
  type: teststepConstants.DELETE_TESTSTEPS_SUCCESS,
});

export const deleteTeststepsFailure = () => ({
  type: teststepConstants.DELETE_TESTSTEPS_FAILURE,
});
