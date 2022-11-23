import { GET, POST, SERVER_URL } from "constants/appConstants";
import { Api } from "../apiHelper";

export const getAllReportsApi = (data) => {
  return Api(`${SERVER_URL}/api/results/`, GET, null, data);
};

export const getSingleReportsApi = (data) => {
  return Api(`${SERVER_URL}/api/results/${data}`, GET, null);
};

export const addCommentApi = (data) => {
  return Api(`${SERVER_URL}/api/results/addcomment`, POST, data);
};
