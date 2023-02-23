import { apiClient } from "store/apiHelper";

import { DELETE, GET, POST, PUT, SERVER_URL } from "constants/appConstants";

export const getProjectsApi = () =>
  apiClient(`${SERVER_URL}/api/projects`, GET);

export const addNewProjectApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects`, POST, data);

export const getProjectApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects`, GET, null, data);

export const updateProjectNameApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects`, PUT, data);

export const deleteProjectApi = (data) =>
  apiClient(`${SERVER_URL}/api/projects`, DELETE, data);
