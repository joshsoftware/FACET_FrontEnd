import { GET, POST, PUT, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const getEnvironmentsApi = (data) => {
  return apiClient(`${SERVER_URL}/api/environments`, GET, null, data);
};

export const addEnvironmentApi = (data) => {
  return apiClient(`${SERVER_URL}/api/environments`, POST, data);
};

export const editEnvironmentApi = (data) => {
  return apiClient(`${SERVER_URL}/api/environments`, PUT, data);
};
