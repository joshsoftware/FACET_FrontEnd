import superAdminConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    // users: [],
    errors: []
}

const superAdminReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case superAdminConstants.ADD_ADMINS_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: []
            }
        
        case superAdminConstants.ADD_ADMINS_SUCCESS:
            return {
                ...state,
                isLoading: true,
                errors: []
            }

        case superAdminConstants.ADD_ADMINS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
    
            
        default:
            return state;
    }
}

export default superAdminReducer;