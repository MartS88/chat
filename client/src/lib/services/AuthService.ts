import  {type AxiosResponse} from 'axios';
import type {AuthResponse} from '$lib/types/http/AuthResponse';
import $api from '$lib/http/auth';
import {accessTokenStore, emailStore, isActivatedStore, usernameStore} from '../../store/store';
import type {LogoutResponse} from '$lib/types/http/LogoutResponse';
import type {CodeResponse} from '$lib/types/http/CodeResponse';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    const response = await $api.post<AuthResponse>('auth/login', {email, password});
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('isActivated', response.data.isActivated);
    setTimeout(() => {
      accessTokenStore.set(response.data.accessToken);
      usernameStore.set(response.data.username);
      emailStore.set(response.data.email);
      isActivatedStore.set(response.data.isActivated);
    }, 1500);
    return response;
  }

  static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    const response = await $api.post<AuthResponse>('auth/registration', {username, email, password});
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('isActivated', response.data.isActivated);
    setTimeout(() => {
      accessTokenStore.set(response.data.accessToken);
      usernameStore.set(response.data.username);
      emailStore.set(response.data.email);
      isActivatedStore.set(response.data.isActivated);
    }, 1500);
    console.log('registration AuthService', response);
    return response;
  }

  static async logout(): Promise<AxiosResponse<LogoutResponse>> {
    try {
      const response = await $api.post(`auth/logout`);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('isActivated');
      accessTokenStore.clear();
      usernameStore.clear();
      emailStore.clear();
      isActivatedStore.clear();
      return response;
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('isActivated');
      accessTokenStore.clear();
      usernameStore.clear();
      emailStore.clear();
      isActivatedStore.clear();
      throw error;
    }
  }

  static async sendRecoveryCode(email: string): Promise<AxiosResponse<CodeResponse>> {
    const response = await $api.post<CodeResponse>(`auth/get-code`, {email});
    return response;
  }

  static async passwordRecovery(email: string, resetPasswordCode: string, newPassword: string): Promise<AxiosResponse<AuthResponse>> {
    const response = await $api.patch(`auth/password-recovery`, {email, resetPasswordCode, newPassword});
    return response;
  }
}
