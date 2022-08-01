import { SERVER_URL } from '../../constants/appConstants';
import { get, post, put } from '../apiHelper';

export const getPayloadsApi = (project) => {
    return get(`${SERVER_URL}/api/payloads/?project=${project}`)
}

export const addPayloadApi = (data) => {
    return post(`${SERVER_URL}/api/payloads/new`, data)
}

export const editPayloadApi = (data) => {
    return put(`${SERVER_URL}/api/payloads/update`, data)
}