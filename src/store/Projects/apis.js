import { Api } from "store/apiHelper";

import { DELETE, GET, POST, SERVER_URL } from "constants/appConstants";

export const getProjectsApi = () => Api(`${SERVER_URL}/api/projects/`, GET);
export const addNewProjectApi = (data) =>
  Api(`${SERVER_URL}/api/projects/new`, POST, data);

export const getOneProjectApi = (data) =>
  Api(`${SERVER_URL}/api/projects/`, GET, null, data);

export const updateProjectNameApi = (data) =>
  Api(`${SERVER_URL}/api/projects/update-name`, POST, data);

export const deleteProjectApi = (data) =>
  Api(`${SERVER_URL}/api/projects/delete/`, DELETE, data);
