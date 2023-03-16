import axiosInstance from "../../axios";

import { apiClient } from "store/apiHelper";
import { setLocalStorage } from "utils/localStorage";

import { GET, PATCH, POST, PUT, SERVER_URL } from "constants/appConstants";

export const signInApi = async (data) => {
  const res = await apiClient(`${SERVER_URL}/api/auth/login`, POST, data);
  setLocalStorage("accessToken", res.access_token);
  setLocalStorage("refreshToken", res.refresh_token);
  setLocalStorage("isFacetAdmin", res.is_facet_super_admin);
  axiosInstance.defaults.headers["Authorization"] =
    "Bearer " + res.access_token;
  return res;
};

export const signUpApi = (data) => {
  return apiClient(`${SERVER_URL}/api/auth/signup`, POST, data);
};

export const getUserProfileApi = (data) => {
  return apiClient(`${SERVER_URL}/api/user/profile`, GET, null, data);
};

export const updateUserProfileApi = (data) => {
  return apiClient(`${SERVER_URL}/api/user/profile`, PATCH, data);
};

export const changePasswordApi = (data) => {
  return apiClient(`${SERVER_URL}/api/user/password`, PUT, data);
};

export const forgotPasswordRequestApi = (data) =>
  apiClient(`${SERVER_URL}/api/user/password/forgot`, POST, data);

export const resetPasswordApi = (data) =>
  apiClient(`${SERVER_URL}/api/user/password/reset`, PATCH, data);
