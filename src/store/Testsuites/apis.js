import { GET, POST, PUT, SERVER_URL } from "constants/appConstants";
import { Api } from "store/apiHelper";

export const getTestsuitesApi = (data) => {
  return Api(`${SERVER_URL}/api/testsuites/`, GET, null, data);
};

export const addTestsuiteApi = (data) => {
  return Api(`${SERVER_URL}/api/testsuites/new`, POST, data);
};

export const editTestsuiteApi = (data) => {
  return Api(`${SERVER_URL}/api/testsuites/update`, PUT, data);
};
