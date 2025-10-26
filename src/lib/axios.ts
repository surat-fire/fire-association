import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
    }
    return Promise.reject(error);
});

export default api;