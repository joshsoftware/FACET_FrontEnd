// TO-DO
// Currently this apis file functions returns mockdata
// When Apis are available then this functions will be replaced
// by api calls
import { Api } from "store/apiHelper";

import organizationsData from "utils/mockdata/organizations";

import { POST, SERVER_URL } from "constants/appConstants";

export const getOrganizationsApi = () => organizationsData;

// eslint-disable-next-line no-unused-vars
export const getOrganizationApi = (data) => organizationsData.organizations[0];

export const addOrganizationApi = (data) =>
  Api(`${SERVER_URL}/api/organization/new`, POST, data);

export const editOrganizationApi = (data) => data;

export const inviteUsersInOragnizationApi = (data) => data;

export const acceptJoinOrgInvitationApi = (data) => data;
