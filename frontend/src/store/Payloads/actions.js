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
    type: payloadConstants.GET_PAYLOADS_SUCCESS,
    payload: data
})

export const addPayloadsFailure = (data) => ({
    type: payloadConstants.GET_PAYLOADS_FAILURE,
    payload: data
})