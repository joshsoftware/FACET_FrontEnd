import axiosInstance from "../../axios";
import { GET, POST, SERVER_URL } from "../../constants/appConstants";
import { Api } from "../apiHelper";


export const signInApi = async (data) => {
    const res = await Api(`${SERVER_URL}/api/auth/login`, POST, data)
    localStorage.setItem('user', JSON.stringify(res));
    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.token;
    return res;
}

export const signUpApi = (data) => {
    return Api(`${SERVER_URL}/api/auth/signup`, POST, data)
}

export const getAllUsersApi = (data) => {
    return Api(`${SERVER_URL}/api/auth/get_all_users`, GET, null, data)
}
