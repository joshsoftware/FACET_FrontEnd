import environmentConstants from "./constants";

export const getEnvironmentsRequest = (data) => ({
    type: environmentConstants.GET_ENVIRONMENTS_REQUEST,
    payload: data
})

export const getEnvironmentsSuccess = (data) => ({
    type: environmentConstants.GET_ENVIRONMENTS_SUCCESS,
    payload: data
})

export const getEnvironmentsFailure = (data) => ({
    type: environmentConstants.GET_ENVIRONMENTS_FAILURE,
    payload: data
})

export const addEnvironmentsRequest = (data) => ({
    type: environmentConstants.ADD_ENVIRONMENTS_REQUEST,
    payload: data
})

export const addEnvironmentsSuccess = (data) => ({
    type: environmentConstants.ADD_ENVIRONMENTS_SUCCESS,
    payload: data
})

export const addEnvironmentsFailure = (data) => ({
    type: environmentConstants.ADD_ENVIRONMENTS_FAILURE,
    payload: data
})