import scheduleConstants from "./constants";

const initialState = { isLoading: true, scheduledCases: [], isSuccess: false };

const scheduleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case scheduleConstants.GET_SCHEDULES_REQUEST:
      return { ...state, isLoading: true };

    case scheduleConstants.GET_SCHEDULES_SUCCESS:
      return { ...state, isLoading: false, scheduledCases: payload };

    case scheduleConstants.GET_SCHEDULES_FAILURE:
      return { ...state, isLoading: false };

    case scheduleConstants.ADD_SCHEDULE_REQUEST:
      return { ...state, isLoading: true };

    case scheduleConstants.ADD_SCHEDULE_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case scheduleConstants.ADD_SCHEDULE_FAILURE:
      return { ...state, isLoading: false };

    case scheduleConstants.RESET_SCHEDULE_SUCCESS:
      return { ...state, isSuccess: false };

    default:
      return state;
  }
};
export default scheduleReducer;
