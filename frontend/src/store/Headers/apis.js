import { SERVER_URL } from '../../constants/appConstants';
import { get, post } from '../apiHelper';

export const getHeadersApi = (project) => {
    return get(`${SERVER_URL}/api/headers/?project=${project}`)
}

export const addHeaderApi = (data) => {
    return post(`${SERVER_URL}/api/headers/new`, data)
}