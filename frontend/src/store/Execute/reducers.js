import executeConstants from "./constants";

const INITIAL_STATE = {
    isLoading: false,
    data: {},
    results: [],
    errors: []
}

const executeReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case executeConstants.ADD_EXECUTE_REQUEST:
            return {
                ...state,
                isLoading: true,
                data: action.payload.testsuite,
                errors: []
            }
        
        case executeConstants.GET_EXECUTE_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: []
            }

        case executeConstants.GET_EXECUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                results: action.payload,
                errors: []
            }
    
        case executeConstants.GET_EXECUTE_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: {},
                results: [],
                errors: action.payload
            }
            
        default:
            return state;
    }
}

export default executeReducer;