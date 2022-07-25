import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: localStorage.getItem('user')?'Bearer '+JSON.parse(localStorage.getItem('user')).token:null,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default axiosInstance;