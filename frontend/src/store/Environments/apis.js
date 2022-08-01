import { SERVER_URL } from "../../constants/appConstants"
import { get, post, put } from "../apiHelper"

export const getEnvironmentsApi = (project) => {
    return get(`${SERVER_URL}/api/environments?project=${project}`)
}

export const addEnvironmentApi = (data) => {
    return post(`${SERVER_URL}/api/environments/new`, data)
}

export const editEnvironmentApi = (data) => {
    return put(`${SERVER_URL}/api/environments/update`, data)
}