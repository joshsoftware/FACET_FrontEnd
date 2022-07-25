import axiosInstance from "../../axios";
import { SERVER_URL } from "../../constants/appConstants";
import { post } from "../apiHelper";


export const signInApi = async (data) => {
    const res = await post(`${SERVER_URL}/api/auth/login`, data)
    localStorage.setItem('user', JSON.stringify(res));
    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.token;
    return res;
}

export const signUpApi = (data) => {
    return post(`${SERVER_URL}/api/auth/signup`, data)
}