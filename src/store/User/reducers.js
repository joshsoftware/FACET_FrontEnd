/* eslint-disable no-prototype-builtins */
import { getLocalStorage } from 'utils/storage';
import userConstants from './constants';

const isTokenExist = getLocalStorage('accessToken') ? true : false;

const INITIAL_STATE = {
    isLoggedIn: isTokenExist,
    isLoading: false,
    currentUser: {},
    userErr: [],
    error: [],
};

const GET_USERS_INITIAL_STATE = { isLoading: true, users: [], errors: [] };

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.SIGN_IN_REQUEST:
            return { ...state, isLoading: true };

        case userConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                currentUser: action.payload,
                userErr: [],
            };

        case userConstants.SIGN_IN_FAILURE:
            return { ...state, isLoading: false, userErr: action.payload };

        case userConstants.SIGN_UP_REQUEST:
            return { ...state, isLoading: true };

        case userConstants.SIGN_UP_SUCCESS:
            return { ...state, isLoading: false };

        case userConstants.SIGN_UP_FAILURE:
            return { ...state, isLoading: false, userErr: action.payload };

        case userConstants.SIGN_OUT_SUCCESS:
            return { ...state, isLoggedIn: false, currentUser: null, userErr: [] };

        case userConstants.GET_CURRENT_USER_INFO_REQUEST:
            return { ...state, isLoading: true };

        case userConstants.GET_CURRENT_USER_INFO_SUCCESS:
            return { ...state, currentUser: action.payload, userErr: [], isLoading: false };

        case userConstants.GET_CURRENT_USER_INFO_FAILURE:
            return { ...state, userErr: action.payload, isLoading: false };

        case userConstants.UPDATE_USER_PROFILE_REQUEST:
            return { ...state, isLoading: true };

        case userConstants.UPDATE_USER_PROFILE_SUCCESS:
            return { ...state, currentUser: action.payload, isLoading: false };

        case userConstants.UPDATE_USER_PROFILE_FAILURE:
            return { ...state, isLoading: false };

        case userConstants.CHANGE_USER_PASSWORD_REQUEST:
            return { ...state, isLoading: true };

        case userConstants.CHANGE_USER_PASSWORD_SUCCESS:
            return { ...state, isLoading: false };

        case userConstants.CHANGE_USER_PASSWORD_FAILURE:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};

const getUsersReducer = (state = GET_USERS_INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.GET_ALL_USERS_SUCCESS:
            return { ...state, isLoading: false, users: action.payload, errors: [] };

        default:
            return state;
    }
};

export { getUsersReducer, userReducer };
