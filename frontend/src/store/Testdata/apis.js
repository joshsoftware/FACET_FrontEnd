import { SERVER_URL } from '../../constants/appConstants';
import { get, post } from '../apiHelper';

export const getTestdatasApi = (testcase_id) => {
    return get(`${SERVER_URL}/api/testdata/?testcase=${testcase_id}`)
}

export const addTestdataApi = (data) => {
    return post(`${SERVER_URL}/api/testdata/new`, data)
}