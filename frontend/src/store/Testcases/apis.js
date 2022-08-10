import { SERVER_URL } from '../../constants/appConstants';
import { get, post, put } from '../apiHelper';

export const getTestcasesApi = (project) => {
    return get(`${SERVER_URL}/api/testcases/?project=${project}`)
}

export const addTestcaseApi = (data) => {
    return post(`${SERVER_URL}/api/testcases/new`, data)
}

export const editTestcaseApi = (data) => {
    return put(`${SERVER_URL}/api/testcases/update`, data)
}