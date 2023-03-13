import { GET, POST, PUT, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const getTeststepsApi = (data) => {
  return apiClient(`${SERVER_URL}/api/teststeps`, GET, null, data);
};

export const addTeststepApi = (data) => {
  return apiClient(`${SERVER_URL}/api/teststeps`, POST, data);
};

export const editTeststepApi = (data) => {
  return apiClient(`${SERVER_URL}/api/teststeps`, PUT, data);
};
