import testcaseConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    testcases: [],
    errors: []
}

const testcaseReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case testcaseConstants.GET_TESTCASES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                testcases: action.payload,
                errors: []
            }
    
        case testcaseConstants.GET_TESTCASES_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
            
        default:
            return state;
    }
}

export default testcaseReducer;