import { GET, POST, PUT, SERVER_URL } from "../../constants/appConstants"
import { Api } from "../apiHelper"

export const getEnvironmentsApi = (data) => {
    return Api(`${SERVER_URL}/api/environments`, GET, null, data)
}

export const addEnvironmentApi = (data) => {
    return Api(`${SERVER_URL}/api/environments/new`, POST, data)
}

export const editEnvironmentApi = (data) => {
    return Api(`${SERVER_URL}/api/environments/update`, PUT, data)
}