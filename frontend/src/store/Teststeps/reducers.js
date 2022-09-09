import teststepConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    teststeps: [],
    errors: []
}

const teststepReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case teststepConstants.GET_TESTSTEPS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
            
        case teststepConstants.GET_TESTSTEPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                teststeps: action.payload,
                errors: []
            }
    
        case teststepConstants.GET_TESTSTEPS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
            
        default:
            return state;
    }
}

export default teststepReducer;