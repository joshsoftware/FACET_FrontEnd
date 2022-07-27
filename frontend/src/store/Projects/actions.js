import projectConstants from "./constants";

export const fetchProjects = () => ({
    type: projectConstants.FETCH_PROJECTS
})

export const setProjects = (data) => ({
    type:projectConstants.SET_PROJECTS,
    payload: data
})

export const addProject = (data) => ({
    type: projectConstants.ADD_NEW_PROJECT,
    payload: data
})

export const getProjectMembersRequest = (data) => ({
    type: projectConstants.GET_PROJECT_MEMBERS_REQUEST,
    payload: data
})

export const getProjectMembersSuccess = (data) => ({
    type: projectConstants.GET_PROJECT_MEMBERS_SUCCESS,
    payload: data
})

export const getProjectMembersFailure = (data) => ({
    type: projectConstants.GET_PROJECT_MEMBERS_FAILURE,
    payload: data
})