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