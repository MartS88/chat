import axios from 'axios';
import { PUBLIC_API_URL } from '$env/static/public';

// Types
import type {Token} from '$lib/types/Token';

const $api = axios.create({
  baseURL: PUBLIC_API_URL,
  withCredentials: true
});

const setAccessToken = (token: Token): void => {
  localStorage.setItem('accessToken', token.accessToken);
};

const clearAccessToken = (): void => {
  localStorage.removeItem('accessToken');

};

const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

$api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await refresh();
        setAccessToken({accessToken: response.data.accessToken, email: response.data.email});
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return $api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const refresh = async () => {
  const response = await $api.post('/refresh');
  setAccessToken({accessToken: response.data.accessToken});
  console.log('response refresh', response);
  return response.data;
};

export default $api;
