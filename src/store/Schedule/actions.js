import scheduleConstants from "./constants";

export const getAllSchedulesRequest = (data) => ({
  type: scheduleConstants.GET_SCHEDULE_TESTCASE_REQUEST,
  payload: data,
});

export const getAllSchedulesSuccess = (data) => ({
  type: scheduleConstants.GET_SCHEDULE_TESTCASE_SUCCESS,
  payload: data,
});

export const getAllSchedulesFailure = () => ({
  type: scheduleConstants.GET_SCHEDULE_TESTCASE_FAILURE,
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
