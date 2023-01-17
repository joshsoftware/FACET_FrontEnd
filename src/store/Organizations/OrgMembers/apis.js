// TO-DO
// Currently this apis file functions returns mockdata
// When Apis are available then this functions will be replaced
// by api calls
import { Api } from "store/apiHelper";

import { GET, SERVER_URL } from "constants/appConstants";

export const getOrgMembersApi = (data) =>
  Api(`${SERVER_URL}/api/organization/members`, GET, null, data);

// eslint-disable-next-line no-unused-vars
export const changeMemberRoleApi = (data) => {};

// eslint-disable-next-line no-unused-vars
export const removeMemberApi = (data) => {};
