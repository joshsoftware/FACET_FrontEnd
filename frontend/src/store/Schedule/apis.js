import { SERVER_URL } from "../../constants/appConstants";
import { get, post } from "../apiHelper";

export const getAllSchesuledSuitesApi = (project) => {
    return get(`${SERVER_URL}/api/schedule/?project=${project}`)
}

export const addScheduleSuiteApi = (data) => {
    return post(`${SERVER_URL}/api/schedule/new`, data)
}