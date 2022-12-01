import { Api } from "store/apiHelper";

import { DELETE, GET, POST, SERVER_URL } from "constants/appConstants";

export const getProjectMembersApi = (data) =>
  Api(`${SERVER_URL}/api/projects/members`, GET, null, data);

export const addMembersInProjectApi = (data) =>
  Api(`${SERVER_URL}/api/projects/members/add`, POST, data);

export const removeMembersInProjectApi = (data) =>
  Api(`${SERVER_URL}/api/projects/members/remove`, DELETE, data);
