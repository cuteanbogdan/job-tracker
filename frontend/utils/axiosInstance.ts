import axios from "axios";
import { store } from "@/redux/store";
import { refreshToken, logoutUser } from "@/redux/slices/authSlice";

const API_BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request Interceptor - Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Token Expiry & Refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { payload } = await store.dispatch(refreshToken());

        if (payload?.accessToken) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${payload.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${payload.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        store.dispatch(logoutUser());
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
