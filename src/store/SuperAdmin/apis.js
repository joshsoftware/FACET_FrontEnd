import { POST, SERVER_URL } from "constants/appConstants";
import { apiClient } from "store/apiHelper";

export const addAdminsApi = (data) => {
  return apiClient(`${SERVER_URL}/api/auth/admins`, POST, data);
};
