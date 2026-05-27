import axios from "axios";
import {
  API_BASE_URL,
  NGROK_SKIP_BROWSER_WARNING_HEADER,
} from "../config/apiConfig";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    Object.assign(config.headers, NGROK_SKIP_BROWSER_WARNING_HEADER);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
