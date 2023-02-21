import { GET, POST, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const getAllReportsApi = (data) => {
  return apiClient(`${SERVER_URL}/api/results/`, GET, null, data);
};

export const getSingleReportsApi = (data) => {
  return apiClient(`${SERVER_URL}/api/results/${data}`, GET, null);
};

export const addCommentApi = (data) => {
  return apiClient(`${SERVER_URL}/api/results/addcomment`, POST, data);
};
