import { apiClient } from "store/apiHelper";

import { GET, SERVER_URL } from "constants/appConstants";

export const getOrganizationsApi = () =>
  apiClient(`${SERVER_URL}/api/superadmin/organizations/all`, GET);

export const getOrganizationApi = (data) =>
  apiClient(
    `${SERVER_URL}/api/superadmin/organizations/members`,
    GET,
    null,
    data
  );

export const getUsersApi = () =>
  apiClient(`${SERVER_URL}/api/superadmin/members/all`, GET);
