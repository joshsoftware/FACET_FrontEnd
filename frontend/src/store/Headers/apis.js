import { SERVER_URL } from '../../constants/appConstants';
import { get, post, put } from '../apiHelper';

export const getHeadersApi = (project) => {
    return get(`${SERVER_URL}/api/headers/?project=${project}`)
}

export const addHeaderApi = (data) => {
    return post(`${SERVER_URL}/api/headers/new`, data)
}

export const editHeaderApi = (data) => {
    return put(`${SERVER_URL}/api/headers/update`, data)
}