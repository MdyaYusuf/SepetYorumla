import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";

export interface ReturnModel<T> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode: number;
  errors?: string[];
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5222/api/",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      toast.error("Sunucuya bağlanılamıyor. Lütfen internetinizi veya sunucu durumunu kontrol edin.");

      return Promise.reject(error);
    }

    const result = error.response.data as ReturnModel<unknown>;
    const status = error.response.status;

    const errorMessage = result?.message || "Bir hata oluştu.";

    switch (status) {
      case 400:
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach(err => toast.error(err));
        } else {
          toast.error(errorMessage);
        }
        break;
      case 401:
        toast.error("Oturum süreniz dolmuş veya yetkiniz yok.");
        break;
      case 404:
        console.warn("Aradığınız kaynak bulunamadı.");
        break;
      case 500:
        toast.error("Sunucu taraflı bir hata oluştu.");
        break;
      default:
        toast.error("Bir şeyler ters gitti.");
        break;
    }
    return Promise.reject(error);
  }
);

export const requests = {
  get: <T>(url: string) => axiosInstance.get<ReturnModel<T>>(url).then(response => response.data),
  post: <T>(url: string, body: object) => axiosInstance.post<ReturnModel<T>>(url, body).then(response => response.data),
  put: <T>(url: string, body: object) => axiosInstance.put<ReturnModel<T>>(url, body).then(response => response.data),
  delete: <T>(url: string) => axiosInstance.delete<ReturnModel<T>>(url).then(response => response.data),
};

export default axiosInstance;