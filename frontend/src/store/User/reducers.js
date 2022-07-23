import userConstants from "./constants";

const INITIAL_STATE = {
    isLoggedIn: JSON.parse(localStorage.getItem('user'))&&JSON.parse(localStorage.getItem('user')).hasOwnProperty('token'),
    currentUser: JSON.parse(localStorage.getItem('user')),
    userErr: []
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr: [],
                isLoggedIn: true
            }
        
        case userConstants.SIGN_OUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: null,
                userErr: []
            }

        default:
            return state;
    }
}

export default userReducer;