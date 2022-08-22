import { SERVER_URL } from '../../constants/appConstants';
import { get, post } from '../apiHelper';

export const getAllReportsApi = (project) => {
    return get(`${SERVER_URL}/api/results/?project=${project}`)
}

export const addCommentApi = (data) => {
    return post(`${SERVER_URL}/api/results/addcomment`, data)
}