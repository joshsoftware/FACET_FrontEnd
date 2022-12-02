import projectConstants from "./constants";

export const getProjectsRequest = () => ({
  type: projectConstants.GET_PROJECTS_REQUEST,
});

export const getProjectsSuccess = (data) => ({
  type: projectConstants.GET_PROJECTS_SUCCESS,
  payload: data,
});

export const getProjectsFailure = () => ({
  type: projectConstants.GET_PROJECTS_FAILURE,
});

export const addProjectRequest = (data) => ({
  type: projectConstants.ADD_PROJECT_REQUEST,
  payload: data,
});

export const addProjectSuccess = () => ({
  type: projectConstants.ADD_PROJECT_SUCCESS,
});

export const addProjectFailure = () => ({
  type: projectConstants.ADD_PROJECT_FAILURE,
});

export const getOneProjectRequest = (data) => ({
  type: projectConstants.GET_ONE_PROJECT_REQUEST,
  payload: data,
});

export const getOneProjectSuccess = (data) => ({
  type: projectConstants.GET_ONE_PROJECT_SUCCESS,
  payload: data,
});

export const getOneProjectFailure = () => ({
  type: projectConstants.GET_ONE_PROJECT_FAILURE,
});

export const updateProjectNameRequest = (data) => ({
  type: projectConstants.UPDATE_PROJECT_NAME_REQUEST,
  payload: data,
});

export const updateProjectNameSuccess = () => ({
  type: projectConstants.UPDATE_PROJECT_NAME_SUCCESS,
});

export const updateProjectNameFailure = () => ({
  type: projectConstants.UPDATE_PROJECT_NAME_FAILURE,
});

export const deleteProjectRequest = (data) => ({
  type: projectConstants.DELETE_PROJECT_REQUEST,
  payload: data,
});

export const deleteProjectSuccess = () => ({
  type: projectConstants.DELETE_PROJECT_SUCCESS,
});

export const deleteProjectFailure = () => ({
  type: projectConstants.DELETE_PROJECT_FAILURE,
});
