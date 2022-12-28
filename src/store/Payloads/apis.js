import { GET, POST, PUT, SERVER_URL } from "../../constants/appConstants";
import { Api } from "../apiHelper";

export const getPayloadsApi = (data) => {
  return Api(`${SERVER_URL}/api/payloads/`, GET, null, data);
};

export const addPayloadApi = (data) => {
  return Api(`${SERVER_URL}/api/payloads/new`, POST, data);
};

export const editPayloadApi = (data) => {
  return Api(`${SERVER_URL}/api/payloads/update`, PUT, data);
};
