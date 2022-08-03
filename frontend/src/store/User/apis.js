import axiosInstance from "../../axios";
import { SERVER_URL } from "../../constants/appConstants";
import { get, post } from "../apiHelper";


export const signInApi = async (data) => {
    const res = await post(`${SERVER_URL}/api/auth/login`, data)
    localStorage.setItem('user', JSON.stringify(res));
    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.token;
    return res;
}

export const signUpApi = (data) => {
    return post(`${SERVER_URL}/api/auth/signup`, data)
}

export const getAllUsersApi = ({ exclude, project }) => {
    return get(`${SERVER_URL}/api/auth/get_all_users?exclude=${exclude}&project=${project?project:''}`)
}
