import { GET, POST, PUT, SERVER_URL } from '../../constants/appConstants';
import { Api } from '../apiHelper';

export const getHeadersApi = (data) => {
    return Api(`${SERVER_URL}/api/headers/`, GET, null, data)
}

export const addHeaderApi = (data) => {
    return Api(`${SERVER_URL}/api/headers/new`, POST, data)
}

export const editHeaderApi = (data) => {
    return Api(`${SERVER_URL}/api/headers/update`, PUT, data)
}