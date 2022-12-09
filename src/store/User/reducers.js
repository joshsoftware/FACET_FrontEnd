import { getLocalStorage } from "utils/localStorage";

import userConstants from "./constants";

const isTokenExist = getLocalStorage("accessToken") ? true : false;

const initialState = {
  isLoggedIn: isTokenExist,
  isLoading: false,
  currentUser: { name: "" },
  users: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userConstants.SIGN_IN_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: payload,
      };

    case userConstants.SIGN_IN_FAILURE:
      return { ...state, isLoading: false };

    case userConstants.SIGN_UP_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.SIGN_UP_SUCCESS:
      return { ...state, isLoading: false };

    case userConstants.SIGN_UP_FAILURE:
      return { ...state, isLoading: false };

    case userConstants.SIGN_OUT_SUCCESS:
      return { ...state, isLoggedIn: false, currentUser: {} };

    case userConstants.GET_CURRENT_USER_INFO_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.GET_CURRENT_USER_INFO_SUCCESS:
      return { ...state, currentUser: payload, isLoading: false };

    case userConstants.GET_CURRENT_USER_INFO_FAILURE:
      return { ...state, isLoading: false };

    case userConstants.UPDATE_USER_PROFILE_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, currentUser: payload, isLoading: false };

    case userConstants.UPDATE_USER_PROFILE_FAILURE:
      return { ...state, isLoading: false };

    case userConstants.CHANGE_USER_PASSWORD_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.CHANGE_USER_PASSWORD_SUCCESS:
      return { ...state, isLoading: false };

    case userConstants.CHANGE_USER_PASSWORD_FAILURE:
      return { ...state, isLoading: false };

    case userConstants.GET_USERS_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.GET_USERS_SUCCESS:
      return { ...state, isLoading: false, users: payload };

    case userConstants.GET_USERS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default userReducer;
