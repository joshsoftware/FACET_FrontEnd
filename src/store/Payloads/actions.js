import payloadConstants from "./constants";

export const getPayloadsRequest = (data) => ({
    type: payloadConstants.GET_PAYLOADS_REQUEST,
    payload: data
})

export const getPayloadsSuccess = (data) => ({
    type: payloadConstants.GET_PAYLOADS_SUCCESS,
    payload: data
})

export const getPayloadsFailure = (data) => ({
    type: payloadConstants.GET_PAYLOADS_FAILURE,
    payload: data
})

export const addPayloadsRequest = (data) => ({
    type: payloadConstants.ADD_PAYLOADS_REQUEST,
    payload: data
})

export const addPayloadsSuccess = (data) => ({
    type: payloadConstants.ADD_PAYLOADS_SUCCESS,
    payload: data
})

export const addPayloadsFailure = (data) => ({
    type: payloadConstants.ADD_PAYLOADS_FAILURE,
    payload: data
})

export const editPayloadsRequest = (data) => ({
    type: payloadConstants.EDIT_PAYLOADS_REQUEST,
    payload: data
})

export const editPayloadsSuccess = (data) => ({
    type: payloadConstants.EDIT_PAYLOADS_SUCCESS,
    payload: data
})

export const editPayloadsFailure = (data) => ({
    type: payloadConstants.EDIT_PAYLOADS_FAILURE,
    payload: data
})

export const deletePayloadsRequest = (data) => ({
    type: payloadConstants.DELETE_PAYLOADS_REQUEST,
    payload: data
})

export const deletePayloadsSuccess = (data) => ({
    type: payloadConstants.DELETE_PAYLOADS_SUCCESS,
    payload: data
})

export const deletePayloadsFailure = (data) => ({
    type: payloadConstants.DELETE_PAYLOADS_FAILURE,
    payload: data
})