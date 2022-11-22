import axiosInstance from "../axios";

export const Api = async (url, method, data, params, responseType) => {
  try {
    const res = await axiosInstance({
      url: url,
      method: method,
      data: data,
      params: params,
      responseType,
    });

    if (responseType === "blob") {
      return res;
    }

    return res.data;
  } catch (err) {
    throw err.response;
  }
};
