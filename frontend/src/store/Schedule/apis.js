import { GET, POST, SERVER_URL } from "../../constants/appConstants";
import { Api } from "../apiHelper";

export const getAllSchesuledSuitesApi = (data) => {
    return Api(`${SERVER_URL}/api/schedule/`, GET, null, data)
}

export const addScheduleSuiteApi = (data) => {
    return Api(`${SERVER_URL}/api/schedule/new`, POST, data)
}