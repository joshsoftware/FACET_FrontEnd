import projectConstants from "./constants";

export const getProjectsRequest = () => ({
  type: projectConstants.GET_PROJECTS_REQUEST,
});

export const getProjectsSuccess = (data) => ({
  type: projectConstants.GET_PROJECTS_SUCCESS,
  payload: data,
});

export const getProjectsFailure = (data) => ({
  type: projectConstants.GET_PROJECTS_FAILURE,
  payload: data,
});

export const addProjectRequest = (data) => ({
  type: projectConstants.ADD_PROJECT_REQUEST,
  payload: data,
});

export const addProjectSuccess = (data) => ({
  type: projectConstants.ADD_PROJECT_SUCCESS,
  payload: data,
});

export const addProjectFailure = (data) => ({
  type: projectConstants.ADD_PROJECT_FAILURE,
  payload: data,
});

export const getOneProjectRequest = (data) => ({
  type: projectConstants.GET_ONE_PROJECT_REQUEST,
  payload: data,
});

export const getOneProjectSuccess = (data) => ({
  type: projectConstants.GET_ONE_PROJECT_SUCCESS,
  payload: data,
});

export const getOneProjectFailure = (data) => ({
  type: projectConstants.GET_ONE_PROJECT_FAILURE,
  payload: data,
});

export const updateProjectNameRequest = (data) => ({
  type: projectConstants.UPDATE_PROJECT_NAME_REQUEST,
  payload: data,
});

export const updateProjectNameSuccess = (data) => ({
  type: projectConstants.UPDATE_PROJECT_NAME_SUCCESS,
  payload: data,
});

export const updateProjectNameFailure = (data) => ({
  type: projectConstants.UPDATE_PROJECT_NAME_FAILURE,
  payload: data,
});

export const deleteProjectRequest = (data) => ({
  type: projectConstants.DELETE_PROJECT_REQUEST,
  payload: data,
});

export const deleteProjectSuccess = (data) => ({
  type: projectConstants.DELETE_PROJECT_SUCCESS,
  payload: data,
});

export const deleteProjectFailure = (data) => ({
  type: projectConstants.DELETE_PROJECT_FAILURE,
  payload: data,
});
