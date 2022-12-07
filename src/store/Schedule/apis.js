import { Api } from "store/apiHelper";

import { GET, POST, SERVER_URL } from "constants/appConstants";

export const getAllScheduledTestcasesApi = (data) =>
  Api(`${SERVER_URL}/api/schedule/`, GET, null, data);

export const addScheduleTestcaseApi = (data) =>
  Api(`${SERVER_URL}/api/schedule/new`, POST, data);
