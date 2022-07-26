import executeConstants from "./constants";

export const getExecuteRequest = (data) => ({
    type: executeConstants.GET_EXECUTE_REQUEST,
    payload: data
})

export const getExecuteSuccess = (data) => ({
    type: executeConstants.GET_EXECUTE_SUCCESS,
    payload: data
})

export const getExecuteFailure = (data) => ({
    type: executeConstants.GET_EXECUTE_FAILURE,
    payload: data
})

export const addExecuteRequest = (data) => ({
    type: executeConstants.ADD_EXECUTE_REQUEST,
    payload: data
})

export const addExecuteSuccess = (data) => ({
    type: executeConstants.ADD_EXECUTE_SUCCESS,
    payload: data
})

export const addExecuteFailure = (data) => ({
    type: executeConstants.ADD_EXECUTE_FAILURE,
    payload: data
})