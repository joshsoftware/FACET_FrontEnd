import { SERVER_URL } from '../../constants/appConstants';
import { get, post } from '../apiHelper';

export const getAllUsersApi = () => {
    return get(`${SERVER_URL}/api/auth/get_all_users`)
}

export const addAdminsApi = (data) => {
    return post(`${SERVER_URL}/api/auth/add_admin`, data)
}