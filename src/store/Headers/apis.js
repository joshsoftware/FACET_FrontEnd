import { GET, POST, PUT, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const getHeadersApi = (data) => {
  return apiClient(`${SERVER_URL}/api/headers/`, GET, null, data);
};

export const addHeaderApi = (data) => {
  return apiClient(`${SERVER_URL}/api/headers/new`, POST, data);
};

export const editHeaderApi = (data) => {
  return apiClient(`${SERVER_URL}/api/headers/update`, PUT, data);
};
