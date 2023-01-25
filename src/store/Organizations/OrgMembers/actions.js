import orgMembersConstants from "./constants";

export const getOrgMembersRequest = (data) => ({
  type: orgMembersConstants.GET_ORG_MEMBERS_REQUEST,
  payload: data,
});

export const getOrgMembersSuccess = (data) => ({
  type: orgMembersConstants.GET_ORG_MEMBERS_SUCCESS,
  payload: data,
});

export const getOrgMembersFailure = () => ({
  type: orgMembersConstants.GET_ORG_MEMBERS_FAILURE,
});

export const changeMemberRoleRequest = (data) => ({
  type: orgMembersConstants.CHANGE_MEMBER_ROLE_REQUEST,
  payload: data,
});

export const changeMemberRoleSuccess = () => ({
  type: orgMembersConstants.CHANGE_MEMBER_ROLE_SUCCESS,
});

export const changeMemberRoleFailure = () => ({
  type: orgMembersConstants.CHANGE_MEMBER_ROLE_FAILURE,
});

export const removeMemberFromOrgRequest = (data) => ({
  type: orgMembersConstants.REMOVE_MEMBER_FROM_ORG_REQUEST,
  payload: data,
});

export const removeMemberFromOrgSuccess = () => ({
  type: orgMembersConstants.REMOVE_MEMBER_FROM_ORG_SUCCESS,
});

export const removeMemberFromOrgFailure = () => ({
  type: orgMembersConstants.REMOVE_MEMBER_FROM_ORG_FAILURE,
});

export const getFilteredOrgUsersRequest = (data) => ({
  type: orgMembersConstants.GET_FILTERED_ORG_USERS_REQUEST,
  payload: data,
});

export const getFilteredOrgUsersSuccess = (data) => ({
  type: orgMembersConstants.GET_FILTERED_ORG_USERS_SUCCESS,
  payload: data,
});

export const getFilteredOrgUsersFailure = () => ({
  type: orgMembersConstants.GET_FILTERED_ORG_USERS_FAILURE,
});

export const clearOrgMemberState = () => ({
  type: orgMembersConstants.CLEAR_STATE,
});
