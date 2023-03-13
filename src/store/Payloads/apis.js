import { GET, POST, PUT, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const getPayloadsApi = (data) => {
  return apiClient(`${SERVER_URL}/api/payloads`, GET, null, data);
};

export const addPayloadApi = (data) => {
  return apiClient(`${SERVER_URL}/api/payloads`, POST, data);
};

export const editPayloadApi = (data) => {
  return apiClient(`${SERVER_URL}/api/payloads`, PUT, data);
};
