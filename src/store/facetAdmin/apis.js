import { Api } from "store/apiHelper";

import { GET, SERVER_URL } from "constants/appConstants";

export const getOrganizationsApi = () =>
  Api(`${SERVER_URL}/api/superadmin/organizations/all`, GET);

export const getOrganizationApi = (data) =>
  Api(`${SERVER_URL}/api/superadmin/organizations/members`, GET, null, data);

export const getUsersApi = () =>
  Api(`${SERVER_URL}/api/superadmin/members/all`, GET);
