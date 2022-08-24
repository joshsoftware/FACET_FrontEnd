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

export const addMembersInProjectApi = (data) => {
    console.log(data)
    return post(`${SERVER_URL}/api/projects/members/add`, data)
}

export const getOneProjectApi = (project) => {
    return get(`${SERVER_URL}/api/projects/?project=${project}`)
}

export const updateProjectNameApi = (data) => {
    return post(`${SERVER_URL}/api/projects/update-name`, data)
}