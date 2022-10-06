import { GET, POST, SERVER_URL } from '../../constants/appConstants';
import { Api } from '../apiHelper';

export const getTestdatasApi = (data) => {
    return Api(`${SERVER_URL}/api/testdata/`, GET, null, data)
}

export const addTestdataApi = (data) => {
    return Api(`${SERVER_URL}/api/testdata/new`, POST, data)
}