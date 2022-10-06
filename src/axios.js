import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: localStorage.getItem('user')?'Bearer '+JSON.parse(localStorage.getItem('user')).token:null,
        'Accept': 'application/json',
        "content-type": "application/json"
    },
    data: ""
})

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
)

export default axiosInstance;
