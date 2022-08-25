import { 
    DELETE,
    GET,
    POST,
    SERVER_URL
} from "../../constants/appConstants";
import { Api } from "../apiHelper";


export const getProjectsApi = () => {
    return Api(`${SERVER_URL}/api/projects/`, GET)
}

export const addNewProjectApi = (data) => {
    return Api(`${SERVER_URL}/api/projects/new`, POST, data)
}

export const getProjectMembersApi = (data) => {
    return Api(`${SERVER_URL}/api/projects/members`, GET, null, data)
}

export const addMembersInProjectApi = (data) => {
    return Api(`${SERVER_URL}/api/projects/members/add`, POST, data)
}

export const getOneProjectApi = (data) => {
    return Api(`${SERVER_URL}/api/projects/`, GET, null, data)
}

export const updateProjectNameApi = (data) => {
    return Api(`${SERVER_URL}/api/projects/update-name`, POST, data)
}

export const deleteProjectApi = (data) => {
    return Api(`${SERVER_URL}/api/projects/delete/`, DELETE, data)
}