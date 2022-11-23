import axios from "axios";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "utils/localStorage";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: getLocalStorage("accessToken")
      ? `Bearer ` + getLocalStorage("accessToken")
      : null,
    Accept: "application/json",
    "content-type": "application/json",
  },
  data: "",
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "/api/auth/token/refresh/"
    ) {
      removeLocalStorage("accessToken");
      removeLocalStorage("refreshToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.data.msg === "Token has expired" &&
      error.response.statusText === "UNAUTHORIZED"
    ) {
      const updatedToken = await refreshExpiredToken();
      originalRequest.headers["Authorization"] = `Bearer ${updatedToken}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

// refreshExpiredTokenClosure returns the function which checks if refresh api is called or not
// to request the new access token
// If refresh api is already called by any other api which fails with 401 UNAUTHORIZED Token
// has expired message then it returns current running promise and its response.
// If function is not called already and old access token fails then it calls refresh token
// api to genrate to new access token.

// The closure used because if multiple resquest fails with 401 UNAUTHORIZED Token has expired
// message then it avoid multiple refresh token calls with using previous promise called
const refreshExpiredTokenClosure = () => {
  let isCalled = false;
  let runningPromise = undefined;
  return () => {
    if (isCalled) {
      return runningPromise;
    } else {
      isCalled = true;
      runningPromise = refreshExpiredTokenAPI();
      return runningPromise;
    }
  };
};

// stores the function returned by refreshExpiredTokenClosure
const refreshExpiredToken = refreshExpiredTokenClosure();

// token refresh api calls
const refreshExpiredTokenAPI = () => {
  const refreshToken = getLocalStorage("refreshToken");

  if (refreshToken) {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${refreshToken}`;

    return axiosInstance.post("/api/auth/token/refresh/").then((res) => {
      const res_access_token = res.data.access_token;

      setLocalStorage("accessToken", res_access_token);
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${res_access_token}`;

      return res_access_token;
    });
  }
};

export default axiosInstance;
