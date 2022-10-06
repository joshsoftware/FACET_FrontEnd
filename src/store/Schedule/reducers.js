import scheduleConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    scheduledCases: [],
    errors: []
}

const scheduleReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case scheduleConstants.GET_SCHEDULE_TESTCASE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        
        case scheduleConstants.GET_SCHEDULE_TESTCASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                scheduledCases: action.payload
            }
        
        case scheduleConstants.GET_SCHEDULE_TESTCASE_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: []
            }
        
        case scheduleConstants.ADD_SCHEDULE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        
        case scheduleConstants.ADD_SCHEDULE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        
        case scheduleConstants.ADD_SCHEDULE_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: []
            }

        default:
            return state;
    }
}
export default scheduleReducer;