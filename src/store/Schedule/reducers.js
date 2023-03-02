import scheduleConstants from "./constants";

const initialState = { isLoading: true, scheduledCases: [] };

const scheduleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case scheduleConstants.GET_SCHEDULE_TESTCASE_REQUEST:
      return { ...state, isLoading: true };

    case scheduleConstants.GET_SCHEDULE_TESTCASE_SUCCESS:
      return { ...state, isLoading: false, scheduledCases: payload };

    case scheduleConstants.GET_SCHEDULE_TESTCASE_FAILURE:
      return { ...state, isLoading: false };

    case scheduleConstants.ADD_SCHEDULE_REQUEST:
      return { ...state, isLoading: true };

    case scheduleConstants.ADD_SCHEDULE_SUCCESS:
      return { ...state, isLoading: false };

    case scheduleConstants.ADD_SCHEDULE_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
export default scheduleReducer;
