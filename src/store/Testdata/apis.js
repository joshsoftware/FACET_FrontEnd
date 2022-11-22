import { GET, POST, SERVER_URL } from "constants/appConstants";
import { Api } from "../apiHelper";

export const getTestdatasApi = (data) =>
  Api(`${SERVER_URL}/api/testdata/`, GET, null, data);

export const addTestdataApi = (data) =>
  Api(`${SERVER_URL}/api/testdata/new`, POST, data);

export const downloadTestdataExcelApi = (data) =>
  Api(`${SERVER_URL}/api/testdata-excel/download`, GET, null, data);

export const uploadTestdataExcelApi = (data) =>
  Api(`${SERVER_URL}/api/testdata-excel/upload`, POST, data);
