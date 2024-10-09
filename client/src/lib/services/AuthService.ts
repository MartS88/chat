import axios, {type AxiosResponse} from 'axios';
import type {AuthResponse} from '$lib/types/AuthResponse';
import $api from '$lib/http/auth';
import {accessTokenStore, emailStore, isActivatedStore} from '../../store/store';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        const response = await $api.post<AuthResponse>('/login', { email, password, });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('email',response.data.email)
        localStorage.setItem('isActivated',response.data.isActivated)
        setTimeout(() => {
            accessTokenStore.set(response.data.accessToken);
            emailStore.set(response.data.email)
            isActivatedStore.set(response.data.isActivated)
        },1500)
        console.log('login AuthService', response)
        return response;
    }

    static async registration(username:string,email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        const response = await $api.post<AuthResponse>('/registration', { username,email, password });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('email',response.data.email)
        setTimeout(() => {
            accessTokenStore.set(response.data.accessToken);
            emailStore.set(response.data.email)
            isActivatedStore.set(response.data.isActivated)
        },1500)
        console.log('registration AuthService', response)
        return response;
    }
    static async logout(): Promise<void> {
        try {
            const response = await axios.post('http://localhost:5000/auth/logout',{},{withCredentials:true});
            localStorage.removeItem('accessToken');
            localStorage.removeItem('email')
            localStorage.removeItem('isActivated')
            accessTokenStore.clear();
            emailStore.clear()
            isActivatedStore.clear()
            console.log('logout Authservice', response)
            return response.data;
        } catch (error) {
            console.error('Logout failed AUTH SERVICE:', error);
            throw error;
        }
    }
}
