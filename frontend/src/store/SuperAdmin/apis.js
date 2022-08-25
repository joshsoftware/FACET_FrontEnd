import { POST, SERVER_URL } from '../../constants/appConstants';
import { Api } from '../apiHelper';


export const addAdminsApi = (data) => {
    return Api(`${SERVER_URL}/api/auth/add_admins`, POST, data)
}