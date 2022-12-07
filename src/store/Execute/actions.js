import executeConstants from "./constants";

export const addExecuteRequest = (data) => ({
  type: executeConstants.ADD_EXECUTE_REQUEST,
  payload: data,
});

export const addExecuteSuccess = (data) => ({
  type: executeConstants.ADD_EXECUTE_SUCCESS,
  payload: data,
});

export const addExecuteFailure = () => ({
  type: executeConstants.ADD_EXECUTE_FAILURE,
});

export const clearExecutionFailure = () => ({
  type: executeConstants.CLEAR_EXECUTE_FAILURE,
});
