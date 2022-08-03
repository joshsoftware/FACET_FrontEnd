import superAdminConstants from "./constants";

const INITIAL_STATE = {
    // isLoading: true,
    // users: [],
    errors: []
}

const superAdminReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // case superAdminConstants.GET_ALL_USERS_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         users: action.payload,
        //         errors: []
        //     }
    
            
        default:
            return state;
    }
}

export default superAdminReducer;