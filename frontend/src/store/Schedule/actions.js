import scheduleConstants from "./constants";

export const getAllSchedulesRequest = (data) => ({
    type: scheduleConstants.GET_SCHEDULE_TESTSUITE_REQUEST,
    payload: data
})

export const getAllSchedulesSuccess = (data) => ({
    type: scheduleConstants.GET_SCHEDULE_TESTSUITE_SUCCESS,
    payload: data
})

export const getAllSchedulesFailure = (data) => ({
    type: scheduleConstants.GET_SCHEDULE_TESTSUITE_FAILURE,
    payload: data
})

export const addScheduleRequest = (data) => ({
    type: scheduleConstants.ADD_SCHEDULE_REQUEST,
    payload: data
})

export const addScheduleSuccess = (data) => ({
    type: scheduleConstants.ADD_SCHEDULE_SUCCESS,
    payload: data
})

export const addScheduleFailure = (data) => ({
    type: scheduleConstants.ADD_SCHEDULE_FAILURE,
    payload: data
})