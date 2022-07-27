import superAdminConstants from "./constants";

export const getAllUsersRequest = (data) => ({
    type: superAdminConstants.GET_ALL_USERS_REQUEST,
    payload: data
})

export const getAllUsersSuccess = (data) => ({
    type: superAdminConstants.GET_ALL_USERS_SUCCESS,
    payload: data
})

export const getAllUsersFailure = (data) => ({
    type: superAdminConstants.GET_ALL_USERS_FAILURE,
    payload: data
})

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