import { apiClient } from "store/apiHelper";

import { GET, POST, PUT, SERVER_URL } from "constants/appConstants";

export const getTestdatasApi = (data) => {
  return apiClient(`${SERVER_URL}/api/testdata/`, GET, null, data);
};

export const addTestdataApi = (data) => {
  return apiClient(`${SERVER_URL}/api/testdata/new`, POST, data);
};

export const editTestdataApi = (data) => {
  return apiClient(`${SERVER_URL}/api/testdata/update`, PUT, data);
};
