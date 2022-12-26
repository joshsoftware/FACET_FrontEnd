import { GET, POST, PUT, SERVER_URL } from "../../constants/appConstants";
import { Api } from "../apiHelper";

export const getTestcasesApi = (data) => {
  return Api(`${SERVER_URL}/api/testcases/`, GET, null, data);
};

export const addTestcaseApi = (data) => {
  return Api(`${SERVER_URL}/api/testcases/new`, POST, data);
};

export const editTestcaseApi = (data) => {
  return Api(`${SERVER_URL}/api/testcases/update`, PUT, data);
};
