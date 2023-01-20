import facetAdminConstants from "./constants";

export const getOrganizationsRequest = () => ({
  type: facetAdminConstants.GET_ORGANIZATIONS_REQUEST,
});

export const getOrganizationsSuccess = (data) => ({
  type: facetAdminConstants.GET_ORGANIZATIONS_SUCCESS,
  payload: data,
});

export const getOrganizationsFailure = () => ({
  type: facetAdminConstants.GET_ORGANIZATIONS_FAILURE,
});

export const getOrganizationRequest = (data) => ({
  type: facetAdminConstants.GET_ORGANIZATION_REQUEST,
  payload: data,
});

export const getOrganizationSuccess = (data) => ({
  type: facetAdminConstants.GET_ORGANIZATION_SUCCESS,
  payload: data,
});

export const getOrganizationFailure = () => ({
  type: facetAdminConstants.GET_ORGANIZATION_FAILURE,
});

export const getUsersRequest = () => ({
  type: facetAdminConstants.GET_USERS_REQUEST,
});

export const getUsersSuccess = (data) => ({
  type: facetAdminConstants.GET_USERS_SUCCESS,
  payload: data,
});

export const getUsersFailure = () => ({
  type: facetAdminConstants.GET_USERS_FAILURE,
});
