import { Api } from "store/apiHelper";

import { POST, PUT, SERVER_URL } from "constants/appConstants";

export const getOrganizationApi = ({ organization }) =>
  Api(`${SERVER_URL}/api/organization/${organization}`);

export const addOrganizationApi = (data) =>
  Api(`${SERVER_URL}/api/organization/new`, POST, data);

export const editOrganizationApi = (data) =>
  Api(`${SERVER_URL}/api/organization/update`, PUT, data);

export const inviteUsersInOragnizationApi = (data) =>
  Api(`${SERVER_URL}/api/organization/members/invite`, POST, data);

export const acceptJoinOrgInvitationApi = (data) =>
  Api(`${SERVER_URL}/api/organization/members/register`, POST, data);
