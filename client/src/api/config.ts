// API 配置文件，封装 axios 实例，处理请求和响应拦截器

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';
const rawApiBaseUrl = (typeof process !== 'undefined' && process.env?.REACT_APP_API_BASE_URL) || '/api';
const apiBaseUrl = rawApiBaseUrl.endsWith('/') ? rawApiBaseUrl.slice(0, -1) : rawApiBaseUrl;

const instance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========== 请求拦截器 ==========
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (isDev) {
      console.log(`[API 请求] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('[请求错误]', error);
    return Promise.reject(error);
  }
);

// ========== 响应拦截器 ==========
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (isDev) {
      console.log(`[API 响应] ${response.config.url}`, response.data);
    }

    // 解构响应数据
    const { code, message, data } = response.data as ApiResponse<unknown>;

    // code === 0 表示成功
    if (code === 0) {
      return data as never;
    }

    // 业务错误
    return Promise.reject(new Error(message || '业务处理失败'));
  },
  (error: AxiosError) => {
    console.error('[响应错误]', error);

    if (error.response) {
      const { status, data } = error.response as { status: number; data?: { message: string } };
      const errorMessage = data?.message || `请求失败 (${status})`;
      return Promise.reject(new Error(errorMessage));
    } else if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('请求超时，请检查网络'));
    } else if (error.message?.includes('Network Error')) {
      return Promise.reject(new Error('网络异常，请稍后重试'));
    }

    return Promise.reject(new Error('系统异常，请稍后重试'));
  }
);

export default instance;