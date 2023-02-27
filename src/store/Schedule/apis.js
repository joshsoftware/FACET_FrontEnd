import { apiClient } from "store/apiHelper";

import { GET, POST, SERVER_URL } from "constants/appConstants";

export const getAllScheduledTestcasesApi = (data) =>
  apiClient(`${SERVER_URL}/api/schedule`, GET, null, data);

export const addScheduleTestcaseApi = (data) =>
  apiClient(`${SERVER_URL}/api/schedule`, POST, data);
