import orgConstants from "./constants";

export const getOrganizationRequest = (data) => ({
  type: orgConstants.GET_ORGANIZATION_REQUEST,
  payload: data,
});

export const getOrganizationSuccess = (data) => ({
  type: orgConstants.GET_ORGANIZATION_SUCCESS,
  payload: data,
});

export const getOrganizationFailure = () => ({
  type: orgConstants.GET_ORGANIZATION_FAILURE,
});

export const addOrganizationRequest = (data) => ({
  type: orgConstants.ADD_ORGANIZATION_REQUEST,
  payload: data,
});

export const addOrganizationSuccess = (data) => ({
  type: orgConstants.ADD_ORGANIZATION_SUCCESS,
  payload: data,
});

export const addOrganizationFailure = () => ({
  type: orgConstants.ADD_ORGANIZATION_FAILURE,
});

export const editOrganizationRequest = (data) => ({
  type: orgConstants.EDIT_ORGANIZATION_REQUEST,
  payload: data,
});

export const editOrganizationSuccess = (data) => ({
  type: orgConstants.EDIT_ORGANIZATION_SUCCESS,
  payload: data,
});

export const editOrganizationFailure = () => ({
  type: orgConstants.EDIT_ORGANIZATION_FAILURE,
});

export const inviteUsersInOrganizationRequest = (data) => ({
  type: orgConstants.INVITE_USERS_IN_ORGANIZATION_REQUEST,
  payload: data,
});

export const inviteUsersInOrganizationSuccess = (data) => ({
  type: orgConstants.INVITE_USERS_IN_ORGANIZATION_SUCCESS,
  payload: data,
});

export const inviteUsersInOrganizationFailure = () => ({
  type: orgConstants.INVITE_USERS_IN_ORGANIZATION_FAILURE,
});

export const leaveOrganizationRequest = (data) => ({
  type: orgConstants.LEAVE_ORGANIZATION_REQUEST,
  payload: data,
});

export const leaveOrganizationSuccess = (data) => ({
  type: orgConstants.LEAVE_ORGANIZATION_SUCCESS,
  payload: data,
});

export const leaveOrganizationFailure = () => ({
  type: orgConstants.LEAVE_ORGANIZATION_FAILURE,
});

export const deleteOrganizationRequest = (data) => ({
  type: orgConstants.DELETE_ORGANIZATION_REQUEST,
  payload: data,
});

export const deleteOrganizationSuccess = (data) => ({
  type: orgConstants.DELETE_ORGANIZATION_SUCCESS,
  payload: data,
});

export const deleteOrganizationFailure = () => ({
  type: orgConstants.DELETE_ORGANIZATION_FAILURE,
});

export const acceptJoinOrgInvitationRequest = (data) => ({
  type: orgConstants.ACCEPT_JOIN_ORG_INVITATION_REQUEST,
  payload: data,
});

export const acceptJoinOrgInvitationSuccess = () => ({
  type: orgConstants.ACCEPT_JOIN_ORG_INVITATION_SUCCESS,
});

export const acceptJoinOrgInvitationFailure = () => ({
  type: orgConstants.ACCEPT_JOIN_ORG_INVITATION_FAILURE,
});

export const clearOrganizationsState = () => ({
  type: orgConstants.CLEAR_STATE,
});
