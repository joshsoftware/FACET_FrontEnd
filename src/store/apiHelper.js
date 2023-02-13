import axiosInstance from "../axios";

export const apiClient = async (url, method, data, params) => {
  try {
    const res = await axiosInstance({
      url: url,
      method: method,
      data: data,
      params: params,
    });
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
