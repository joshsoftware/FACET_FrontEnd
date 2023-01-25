import { getLocalStorage } from "utils/localStorage";

import userConstants from "./constants";

const isTokenExist = getLocalStorage("accessToken") ? true : false;

const isFacetAdmin = !!JSON.parse(getLocalStorage("isFacetAdmin"));

const initialState = {
  isLoggedIn: isTokenExist,
  isSignUpSuccess: false,
  isLoading: false,
  currentUser: { name: "" },
  users: [],
  isPersonalAccount: false,
  isOrgOwner: false,
  isAdmin: false,
  isFacetAdmin: isFacetAdmin,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userConstants.SIGN_IN_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload?.user,
        isLoading: false,
        isLoggedIn: true,
        isOrgOwner: payload?.is_super_admin,
        isAdmin: payload?.is_admin,
        isPersonalAccount: payload?.account_type === "personal",
        isFacetAdmin: payload.is_facet_super_admin,
      };

    case userConstants.SIGN_IN_FAILURE:
      return { ...state, isLoading: false };

    case userConstants.SIGN_UP_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.SIGN_UP_SUCCESS:
      return { ...state, isLoading: false, isSignUpSuccess: true };

    case userConstants.SIGN_UP_FAILURE:
      return { ...state, isLoading: false };

    case userConstants.SIGN_OUT_SUCCESS:
      return { ...initialState, isLoggedIn: false, isFacetAdmin: false };

    case userConstants.GET_CURRENT_USER_INFO_REQUEST:
      return { ...state, isLoading: true };

    case userConstants.GET_CURRENT_USER_INFO_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
        isOrgOwner: payload?.is_super_admin,
        isAdmin: payload?.is_admin,
        isPersonalAccount: payload?.account_type === "personal",
      };

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

    case userConstants.CLEAR_USER_STATE:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
