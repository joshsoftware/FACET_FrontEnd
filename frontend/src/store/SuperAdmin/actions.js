import superAdminConstants from "./constants";



export const addAdminsRequest = (data) => ({
    type: superAdminConstants.ADD_ADMINS_REQUEST,
    payload: data
})

export const addAdminsSuccess = (data) => ({
    type: superAdminConstants.ADD_ADMINS_SUCCESS,
    payload: data
})

export const addAdminsFailure = (data) => ({
    type: superAdminConstants.ADD_ADMINS_FAILURE,
    payload: data
})