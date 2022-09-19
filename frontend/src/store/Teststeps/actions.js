import teststepConstants from "./constants";

export const getTeststepsRequest = (data) => ({
    type: teststepConstants.GET_TESTSTEPS_REQUEST,
    payload: data
})

export const getTeststepsSuccess = (data) => ({
    type: teststepConstants.GET_TESTSTEPS_SUCCESS,
    payload: data
})

export const getTeststepsFailure = (data) => ({
    type: teststepConstants.GET_TESTSTEPS_FAILURE,
    payload: data
})

export const addTeststepsRequest = (data) => ({
    type: teststepConstants.ADD_TESTSTEPS_REQUEST,
    payload: data
})

export const addTeststepsSuccess = (data) => ({
    type: teststepConstants.ADD_TESTSTEPS_SUCCESS,
    payload: data
})

export const addTeststepsFailure = (data) => ({
    type: teststepConstants.ADD_TESTSTEPS_FAILURE,
    payload: data
})

export const editTeststepsRequest = (data) => ({
    type: teststepConstants.EDIT_TESTSTEPS_REQUEST,
    payload: data
})

export const editTeststepsSuccess = (data) => ({
    type: teststepConstants.EDIT_TESTSTEPS_SUCCESS,
    payload: data
})

export const editTeststepsFailure = (data) => ({
    type: teststepConstants.EDIT_TESTSTEPS_FAILURE,
    payload: data
})

export const deleteTeststepsRequest = (data) => ({
    type: teststepConstants.DELETE_TESTSTEPS_REQUEST,
    payload: data
})

export const deleteTeststepsSuccess = (data) => ({
    type: teststepConstants.DELETE_TESTSTEPS_SUCCESS,
    payload: data
})

export const deleteTeststepsFailure = (data) => ({
    type: teststepConstants.DELETE_TESTSTEPS_FAILURE,
    payload: data
})