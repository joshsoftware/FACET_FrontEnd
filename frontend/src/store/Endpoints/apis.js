import { SERVER_URL } from "../../constants/appConstants"
import { get, post, put } from "../apiHelper"

export const getEndpointsApi = (project) => {
    return get(`${SERVER_URL}/api/endpoints/?project=${project}`)
}

export const addEndpointApi = (data) => {
    return post(`${SERVER_URL}/api/endpoints/new`, data)
}

export const editEndpointApi = (data) => {
    return put(`${SERVER_URL}/api/endpoints/update`, data)
}