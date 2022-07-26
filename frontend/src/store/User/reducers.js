import userConstants from "./constants";

const user = JSON.parse(localStorage.getItem('user'))

const INITIAL_STATE = {
    isLoggedIn: user&&user.hasOwnProperty('token'),
    currentUser: user&&user.hasOwnProperty('user')&&user.user,
    userErr: []
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user,
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