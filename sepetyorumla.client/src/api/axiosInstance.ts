import axios from "axios";
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { setCredentials, logout } from "../features/authentication/authSlice";
import type { ApiResponse } from "../models/ApiResponse";
import type { TokenResponseDto } from "../models/Token";

interface RetryableRequest extends InternalAxiosRequestConfig {
  retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5222/api/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.token;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const result = response.data as ApiResponse<unknown>;

    if (result?.success && result?.message && response.config.method !== 'get') {
      toast.success(result.message);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest;

    if (originalRequest?.url?.includes("refresh-token")) {
      store.dispatch(logout());

      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      try {
        const response = await axios.post<ApiResponse<TokenResponseDto>>(
          "http://localhost:5222/api/Authentication/refresh-token",
          {},
          { withCredentials: true }
        );

        const tokenData = response.data.data;
        store.dispatch(setCredentials(tokenData));

        originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;

        if (originalRequest.data instanceof FormData) {
          delete originalRequest.headers['Content-Type'];
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        toast.error("Oturum süreniz doldu, lütfen tekrar giriş yapın.");

        return Promise.reject(refreshError);
      }
    }

    const result = error.response?.data as ApiResponse<null>;

    if (result?.errors && result.errors.length > 0) {
      toast.error(result.errors[0]);
    } else if (result?.message) {
      toast.error(result.message);
    } else if (error.response?.status !== 401) {
      toast.error("Bir hata oluştu.");
    }

    return Promise.reject(error);
  }
);

export const requests = {
  get: <T>(url: string): Promise<ApiResponse<T>> => axiosInstance.get<ApiResponse<T>>(url).then((res) => res.data),
  post: <T>(url: string, body: object | FormData): Promise<ApiResponse<T>> => axiosInstance.post<ApiResponse<T>>(url, body).then((res) => res.data),
  put: <T>(url: string, body: object | FormData): Promise<ApiResponse<T>> => axiosInstance.put<ApiResponse<T>>(url, body).then((res) => res.data),
  delete: <T>(url: string): Promise<ApiResponse<T>> => axiosInstance.delete<ApiResponse<T>>(url).then((res) => res.data),
};

export default axiosInstance;