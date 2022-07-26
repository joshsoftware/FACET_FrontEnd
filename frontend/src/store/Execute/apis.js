import { SERVER_URL } from '../../constants/appConstants';
import { post } from '../apiHelper';

export const executeTestsuiteApi = (data) => {
    return post(`${SERVER_URL}/api/tests`, data)
}