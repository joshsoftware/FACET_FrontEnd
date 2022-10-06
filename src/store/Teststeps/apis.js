import { GET, POST, PUT, SERVER_URL } from '../../constants/appConstants';
import { Api } from '../apiHelper';

export const getTeststepsApi = (data) => {
    return Api(`${SERVER_URL}/api/teststeps/`, GET, null, data)
}

export const addTeststepApi = (data) => {
    return Api(`${SERVER_URL}/api/teststeps/new`, POST, data)
}

export const editTeststepApi = (data) => {
    return Api(`${SERVER_URL}/api/teststeps/update`, PUT, data)
}