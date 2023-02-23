import { GET, POST, PUT, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const getTestcasesApi = (data) => {
  return apiClient(`${SERVER_URL}/api/testcases`, GET, null, data);
};

export const addTestcaseApi = (data) => {
  return apiClient(`${SERVER_URL}/api/testcases`, POST, data);
};

export const editTestcaseApi = (data) => {
  return apiClient(`${SERVER_URL}/api/testcases`, PUT, data);
};
