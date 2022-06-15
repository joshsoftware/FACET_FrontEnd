import { SERVER_URL } from '../../constants/appConstants';
import { get, post } from '../apiHelper';

export const getTestsuitesApi = (project) => {
    return get(`${SERVER_URL}/api/testsuites/?project=${project}`)
}

export const addTestsuiteApi = (data) => {
    return post(`${SERVER_URL}/api/testsuites/new`, data)
}