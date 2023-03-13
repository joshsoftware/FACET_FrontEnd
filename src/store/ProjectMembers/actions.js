import projectMembersConstants from "./constants";

export const getProjectMembersRequest = (data) => ({
  type: projectMembersConstants.GET_PROJECT_MEMBERS_REQUEST,
  payload: data,
});

export const getProjectMembersSuccess = (data) => ({
  type: projectMembersConstants.GET_PROJECT_MEMBERS_SUCCESS,
  payload: data,
});

export const getProjectMembersFailure = () => ({
  type: projectMembersConstants.GET_PROJECT_MEMBERS_FAILURE,
});

export const addMembersInProjectRequest = (data) => ({
  type: projectMembersConstants.ADD_MEMBERS_IN_PROJECT_REQUEST,
  payload: data,
});

export const addMembersInProjectSuccess = () => ({
  type: projectMembersConstants.ADD_MEMBERS_IN_PROJECT_SUCCESS,
});

export const addMembersInProjectFailure = () => ({
  type: projectMembersConstants.ADD_MEMBERS_IN_PROJECT_FAILURE,
});

export const removeMembersInProjectRequest = (data) => ({
  type: projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_REQUEST,
  payload: data,
});

export const removeMembersInProjectSuccess = () => ({
  type: projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_SUCCESS,
});

export const removeMembersInProjectFailure = () => ({
  type: projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_FAILURE,
});

export const getFilteredUsersRequest = (data) => ({
  type: projectMembersConstants.GET_FILTERED_USERS_REQUEST,
  payload: data,
});

export const getFilteredUsersSuccess = (data) => ({
  type: projectMembersConstants.GET_FILTERED_USERS_SUCCESS,
  payload: data,
});

export const getFilteredUsersFailure = () => ({
  type: projectMembersConstants.GET_FILTERED_USERS_FAILURE,
});
