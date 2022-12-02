import payloadConstants from "./constants";

export const getPayloadsRequest = (data) => ({
  type: payloadConstants.GET_PAYLOADS_REQUEST,
  payload: data,
});

export const getPayloadsSuccess = (data) => ({
  type: payloadConstants.GET_PAYLOADS_SUCCESS,
  payload: data,
});

export const getPayloadsFailure = () => ({
  type: payloadConstants.GET_PAYLOADS_FAILURE,
});

export const addPayloadsRequest = (data) => ({
  type: payloadConstants.ADD_PAYLOADS_REQUEST,
  payload: data,
});

export const addPayloadsSuccess = () => ({
  type: payloadConstants.ADD_PAYLOADS_SUCCESS,
});

export const addPayloadsFailure = () => ({
  type: payloadConstants.ADD_PAYLOADS_FAILURE,
});

export const editPayloadsRequest = (data) => ({
  type: payloadConstants.EDIT_PAYLOADS_REQUEST,
  payload: data,
});

export const editPayloadsSuccess = () => ({
  type: payloadConstants.EDIT_PAYLOADS_SUCCESS,
});

export const editPayloadsFailure = () => ({
  type: payloadConstants.EDIT_PAYLOADS_FAILURE,
});

export const deletePayloadsRequest = (data) => ({
  type: payloadConstants.DELETE_PAYLOADS_REQUEST,
  payload: data,
});

export const deletePayloadsSuccess = () => ({
  type: payloadConstants.DELETE_PAYLOADS_SUCCESS,
});

export const deletePayloadsFailure = () => ({
  type: payloadConstants.DELETE_PAYLOADS_FAILURE,
});
