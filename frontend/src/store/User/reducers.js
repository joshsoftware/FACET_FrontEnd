import userConstants from "./userConstants";

const INITIAL_STATE = {
    currentUser: null,
    userErr: []
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr: []
            }
    
        default:
            return state;
    }
}

export default userReducer;