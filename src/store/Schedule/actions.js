import scheduleConstants from "./constants";

export const getSchedulesRequest = (data) => ({
  type: scheduleConstants.GET_SCHEDULES_REQUEST,
  payload: data,
});

export const getSchedulesSuccess = (data) => ({
  type: scheduleConstants.GET_SCHEDULES_SUCCESS,
  payload: data,
});

export const getSchedulesFailure = () => ({
  type: scheduleConstants.GET_SCHEDULES_FAILURE,
});

export const addScheduleRequest = (data) => ({
  type: scheduleConstants.ADD_SCHEDULE_REQUEST,
  payload: data,
});

export const addScheduleSuccess = () => ({
  type: scheduleConstants.ADD_SCHEDULE_SUCCESS,
});

export const addScheduleFailure = () => ({
  type: scheduleConstants.ADD_SCHEDULE_FAILURE,
});

export const resetScheduleSuccess = () => ({
  type: scheduleConstants.RESET_SCHEDULE_SUCCESS,
});
