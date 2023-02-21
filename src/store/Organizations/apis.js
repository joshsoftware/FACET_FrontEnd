import { apiClient } from "store/apiHelper";

import { POST, PUT, SERVER_URL } from "constants/appConstants";

export const getOrganizationApi = ({ organization }) =>
  apiClient(`${SERVER_URL}/api/organization/${organization}`);

export const addOrganizationApi = (data) =>
  apiClient(`${SERVER_URL}/api/organization/new`, POST, data);

export const editOrganizationApi = (data) =>
  apiClient(`${SERVER_URL}/api/organization/update`, PUT, data);

export const inviteUsersInOragnizationApi = (data) =>
  apiClient(`${SERVER_URL}/api/organization/members/invite`, POST, data);

export const acceptJoinOrgInvitationApi = (data) =>
  apiClient(`${SERVER_URL}/api/organization/members/register`, POST, data);
