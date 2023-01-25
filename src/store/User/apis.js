import { Api } from "store/apiHelper";

import axiosInstance from "../../axios";

import { GET, PATCH, POST, SERVER_URL } from "constants/appConstants";
import { setLocalStorage } from "utils/localStorage";

export const signInApi = async (data) => {
  const res = await Api(`${SERVER_URL}/api/auth/login`, POST, data);
  setLocalStorage("accessToken", res.access_token);
  setLocalStorage("refreshToken", res.refresh_token);
  setLocalStorage("isFacetAdmin", res.is_facet_super_admin);
  axiosInstance.defaults.headers["Authorization"] =
    "Bearer " + res.access_token;
  return res;
};

export const signUpApi = (data) => {
  return Api(`${SERVER_URL}/api/auth/signup`, POST, data);
};

export const getUserProfileApi = (data) => {
  return Api(`${SERVER_URL}/api/user/profile`, GET, null, data);
};

export const updateUserProfileApi = (data) => {
  return Api(`${SERVER_URL}/api/user/profile/update`, PATCH, data);
};

export const changePasswordApi = (data) => {
  return Api(`${SERVER_URL}/api/user/change-password`, POST, data);
};
