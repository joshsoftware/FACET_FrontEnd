import projectMembersConstants from "./constants";

export const getProjectMembersRequest = (data) => ({
  type: projectMembersConstants.GET_PROJECT_MEMBERS_REQUEST,
  payload: data,
});

export const getProjectMembersSuccess = (data) => ({
  type: projectMembersConstants.GET_PROJECT_MEMBERS_SUCCESS,
  payload: data,
});

export const getProjectMembersFailure = (data) => ({
  type: projectMembersConstants.GET_PROJECT_MEMBERS_FAILURE,
  payload: data,
});

export const addMembersInProjectRequest = (data) => ({
  type: projectMembersConstants.ADD_MEMBERS_IN_PROJECT_REQUEST,
  payload: data,
});

export const addMembersInProjectSuccess = () => ({
  type: projectMembersConstants.ADD_MEMBERS_IN_PROJECT_SUCCESS,
});

export const addMembersInProjectFailure = (data) => ({
  type: projectMembersConstants.ADD_MEMBERS_IN_PROJECT_FAILURE,
  payload: data,
});

export const removeMembersInProjectRequest = (data) => ({
  type: projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_REQUEST,
  payload: data,
});

export const removeMembersInProjectSuccess = () => ({
  type: projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_SUCCESS,
});

export const removeMembersInProjectFailure = (data) => ({
  type: projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_FAILURE,
  payload: data,
});
