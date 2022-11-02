import axios from "axios";
import {
    getLocalStorage,
    removeLocalStorage,
    setLocalStorage,
} from "utils/localStorage";

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
            error.response.data.msg === "Token has expired" &&
            error.response.status === 401 &&
            error.response.statusText === "UNAUTHORIZED"
        ) {
            const updatedToken = await refreshExpiredToken();
            originalRequest.headers["Authorization"] = `Bearer ${updatedToken}`;
            return axiosInstance(originalRequest);
        }
    }
);

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

const refreshExpiredToken = refreshExpiredTokenClosure();

const refreshExpiredTokenAPI = () => {
    const refreshToken = getLocalStorage("refreshToken");

    if (refreshToken) {
        axiosInstance.defaults.headers[
            "Authorization"
        ] = `Bearer ${refreshToken}`;

        return axiosInstance.post("/api/auth/token/refresh/").then((res) => {
            const res_access_token = res.data.access_token;

            setLocalStorage("accessToken", res_access_token);
            axiosInstance.defaults.headers[
                "Authorization"
            ] = `Bearer ${res_access_token}`;

            return res_access_token;
        });
    }
};

export default axiosInstance;
