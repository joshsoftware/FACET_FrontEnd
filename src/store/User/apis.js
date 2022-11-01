import { Api } from 'store/apiHelper';

import axiosInstance from '../../axios';

import { GET, PATCH, POST, SERVER_URL } from 'constants/appConstants';

export const signInApi = async (data) => {
    const res = await Api(`${SERVER_URL}/api/auth/login`, POST, data);
    localStorage.setItem('access_token', res.token);
    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.token;
    return res;
};

export const signUpApi = (data) => {
    return Api(`${SERVER_URL}/api/auth/signup`, POST, data);
};

export const getAllUsersApi = (data) => {
    return Api(`${SERVER_URL}/api/auth/get_all_users`, GET, null, data);
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
