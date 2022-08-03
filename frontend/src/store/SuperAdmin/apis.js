import { SERVER_URL } from '../../constants/appConstants';
import { post } from '../apiHelper';


export const addAdminsApi = (data) => {
    return post(`${SERVER_URL}/api/auth/add_admins`, data)
}