import environmentConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    environments: [],
    errors: []
}

const environmentReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case environmentConstants.GET_ENVIRONMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                environments: action.payload
            }
        
        case environmentConstants.GET_ENVIRONMENTS_FAILURE:
            return {
                ...state,
                errors: action.payload
            }
    
        default:
            return state;
    }
}

export default environmentReducer;