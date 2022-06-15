import headerConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    headers: [],
    errors: []
}

const headerReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case headerConstants.GET_HEADERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                headers: action.payload,
                errors: []
            }
    
        case headerConstants.GET_HEADERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
            
        default:
            return state;
    }
}

export default headerReducer;