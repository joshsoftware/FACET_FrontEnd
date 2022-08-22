import axiosInstance from "../axios";

export const get = async (url) => {
    try {
        const res = await axiosInstance
            .get(url);
        return res.data;
    } catch (err) {
        throw err.response;
    }
}

export const post = async (url, data) => {
    try {
        const res = await axiosInstance.post(url, data);
        return res.data
    } catch (err) {
        throw err.response
    }
}

export const put = async (url, data) => {
    try {
        const res = await axiosInstance
            .put(url, data);
        return res.data;
    } catch (err) {
        throw err.response;
    }
}

export const patch = async (url, data) => {
    try {
        const res = await axiosInstance
            .patch(url, data);
        return res.data;
    } catch (err) {
        throw err.response;
    }
}

export const del = async (url, data) => {
    try {
        const res = await axiosInstance
            .delete(url, data);
        return res.data;
    } catch (err) {
        throw err.response;
    }
}
