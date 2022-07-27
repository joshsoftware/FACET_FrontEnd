import { SERVER_URL } from "../../constants/appConstants";
import { get, post } from "../apiHelper";


export const getProjectsApi = () => {
    return get(`${SERVER_URL}/api/projects/`)
}

export const addNewProjectApi = (data) => {
    return post(`${SERVER_URL}/api/projects/new`, data)
}

export const getProjectMembersApi = (project) => {
    return get(`${SERVER_URL}/api/projects/members?project=${project}`)
}