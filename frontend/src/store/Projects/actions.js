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

export const addMembersInProjectRequest = (data) => ({
    type: projectConstants.ADD_MEMBERS_IN_PROJECT_REQUEST,
    payload: data
})

export const addMembersInProjectSuccess = (data) => ({
    type: projectConstants.ADD_MEMBERS_IN_PROJECT_SUCCESS,
    payload: data
})

export const addMembersInProjectFailure = (data) => ({
    type: projectConstants.ADD_MEMBERS_IN_PROJECT_FAILURE,
    payload: data
})

export const removeMembersInProjectRequest = (data) => ({
    type: projectConstants.REMOVE_MEMBERS_IN_PROJECT_REQUEST,
    payload: data
})

export const removeMembersInProjectSuccess = (data) => ({
    type: projectConstants.REMOVE_MEMBERS_IN_PROJECT_SUCCESS,
    payload: data
})

export const removeMembersInProjectFailure = (data) => ({
    type: projectConstants.REMOVE_MEMBERS_IN_PROJECT_FAILURE,
    payload: data
})


export const getOneProjectRequest = (data) => ({
    type: projectConstants.GET_ONE_PROJECT_REQUEST,
    payload: data
})

export const getOneProjectSuccess = (data) => ({
    type: projectConstants.GET_ONE_PROJECT_SUCCESS,
    payload: data
})

export const getOneProjectFailure = (data) => ({
    type: projectConstants.GET_ONE_PROJECT_FAILURE,
    payload: data
})

export const updateProjectNameRequest = (data) => ({
    type: projectConstants.UPDATE_PROJECT_NAME_REQUEST,
    payload: data
})

export const updateProjectNameSuccess = (data) => ({
    type: projectConstants.UPDATE_PROJECT_NAME_SUCCESS,
    payload: data
})

export const updateProjectNameFailure = (data) => ({
    type: projectConstants.UPDATE_PROJECT_NAME_FAILURE,
    payload: data
})

export const deleteProjectRequest = (data) => ({
    type: projectConstants.DELETE_PROJECT_REQUEST,
    payload: data
})

export const deleteProjectSuccess = (data) => ({
    type: projectConstants.DELETE_PROJECT_SUCCESS,
    payload: data
})

export const deleteProjectFailure = (data) => ({
    type: projectConstants.DELETE_PROJECT_FAILURE,
    payload: data
})