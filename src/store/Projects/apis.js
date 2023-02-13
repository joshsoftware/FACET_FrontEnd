import { apiClient } from "store/apiHelper";

import { DELETE, GET, POST, SERVER_URL } from "constants/appConstants";

export const getProjectsApi = () =>
  apiClient(`${SERVER_URL}/api/projects/`, GET);

export const addNewProjectApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects/new`, POST, data);

export const getProjectApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects/`, GET, null, data);

export const updateProjectNameApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects/update-name`, POST, data);

export const deleteProjectApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects/delete/`, DELETE, data);
