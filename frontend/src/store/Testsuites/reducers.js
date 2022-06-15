import testsuiteConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    testsuites: [],
    errors: []
}

const testsuiteReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case testsuiteConstants.GET_TESTSUITES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                testsuites: action.payload,
                errors: []
            }
    
        case testsuiteConstants.GET_TESTSUITES_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
            
        default:
            return state;
    }
}

export default testsuiteReducer;