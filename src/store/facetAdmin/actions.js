import facetAdminConstants from "./constants";

export const getOrganizationsRequest = () => ({
  type: facetAdminConstants.GET_ORGANIZATIONS_ADMIN_REQUEST,
});

export const getOrganizationsSuccess = (data) => ({
  type: facetAdminConstants.GET_ORGANIZATIONS_ADMIN_SUCCESS,
  payload: data,
});

export const getOrganizationsFailure = () => ({
  type: facetAdminConstants.GET_ORGANIZATIONS_ADMIN_FAILURE,
});

export const getOrganizationRequest = (data) => ({
  type: facetAdminConstants.GET_ORGANIZATION_ADMIN_REQUEST,
  payload: data,
});

export const getOrganizationSuccess = (data) => ({
  type: facetAdminConstants.GET_ORGANIZATION_ADMIN_SUCCESS,
  payload: data,
});

export const getOrganizationFailure = () => ({
  type: facetAdminConstants.GET_ORGANIZATION_ADMIN_FAILURE,
});

export const getUsersRequest = () => ({
  type: facetAdminConstants.GET_USERS_ADMIN_REQUEST,
});

export const getUsersSuccess = (data) => ({
  type: facetAdminConstants.GET_USERS_ADMIN_SUCCESS,
  payload: data,
});

export const getUsersFailure = () => ({
  type: facetAdminConstants.GET_USERS_ADMIN_FAILURE,
});
