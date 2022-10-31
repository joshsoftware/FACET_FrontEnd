import axios from 'axios';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
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
