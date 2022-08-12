import { SERVER_URL } from '../../constants/appConstants';
import { get } from '../apiHelper';

export const getAllReportsApi = (project) => {
    return get(`${SERVER_URL}/api/results/?project=${project}`)
}
