import { POST, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const executeTestcaseApi = (data) => {
  return apiClient(`${SERVER_URL}/api/tests`, POST, data);
};
