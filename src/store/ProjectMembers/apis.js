import { apiClient } from "store/apiHelper";

import { DELETE, GET, POST, SERVER_URL } from "constants/appConstants";

export const getProjectMembersApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects/members`, GET, null, data);

export const addMembersInProjectApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects/members/add`, POST, data);

export const removeMembersInProjectApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects/members/remove`, DELETE, data);
