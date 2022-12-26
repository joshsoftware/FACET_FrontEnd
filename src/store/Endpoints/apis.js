import { GET, POST, PUT, SERVER_URL } from "../../constants/appConstants";
import { Api } from "../apiHelper";

export const getEndpointsApi = (data) => {
  return Api(`${SERVER_URL}/api/endpoints/`, GET, null, data);
};

export const addEndpointApi = (data) => {
  return Api(`${SERVER_URL}/api/endpoints/new`, POST, data);
};

export const editEndpointApi = (data) => {
  return Api(`${SERVER_URL}/api/endpoints/update`, PUT, data);
};
