import { Api } from "store/apiHelper";

import { DELETE, GET, PUT, SERVER_URL } from "constants/appConstants";

export const getOrgMembersApi = (data) =>
  Api(`${SERVER_URL}/api/organization/members`, GET, null, data);

export const changeMemberRoleApi = (data) =>
  Api(`${SERVER_URL}/api/organization/members/update`, PUT, data);

export const removeMemberApi = (data) =>
  Api(`${SERVER_URL}/api/organization/members/remove`, DELETE, data);
