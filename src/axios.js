import axios from 'axios';
import { getLocalStorage } from 'utils/storage';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: getLocalStorage('accessToken')
            ? 'Bearer ' + getLocalStorage('accessToken')
            : null,
        Accept: 'application/json',
        'content-type': 'application/json',
    },
    data: '',
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});

export default axiosInstance;
