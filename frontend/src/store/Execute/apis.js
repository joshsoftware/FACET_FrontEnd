import { POST, SERVER_URL } from '../../constants/appConstants';
import { Api } from '../apiHelper';

export const executeTestsuiteApi = (data) => {
    return Api(`${SERVER_URL}/api/tests`, POST, data)
}