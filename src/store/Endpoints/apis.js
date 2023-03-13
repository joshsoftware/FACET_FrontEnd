import { GET, POST, PUT, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const getEndpointsApi = (data) => {
  return apiClient(`${SERVER_URL}/api/endpoints`, GET, null, data);
};

export const addEndpointApi = (data) => {
  return apiClient(`${SERVER_URL}/api/endpoints`, POST, data);
};

export const editEndpointApi = (data) => {
  return apiClient(`${SERVER_URL}/api/endpoints`, PUT, data);
};
