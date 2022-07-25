import { SERVER_URL } from "../../constants/appConstants"
import { get, post } from "../apiHelper"

export const getEndpointsApi = (project) => {
    return get(`${SERVER_URL}/api/endpoints/?project=${project}`)
}

export const addEndpointApi = (data) => {
    return post(`${SERVER_URL}/api/endpoints/new`, data)
}