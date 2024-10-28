import axios, {type AxiosResponse} from 'axios';
import $api from '$lib/http/auth';
import {usernameStore} from '../../store/store';
import type {UsernameResponse} from '$lib/types/http/UsernameResponse';
import type {PasswordResponse} from '$lib/types/http/PasswordResponse';


export class UpdateService {

  static async updateUsername(email: string, newUsername: string): Promise<AxiosResponse<UsernameResponse>> {
    const response = await $api.patch(`users/update-username`, {email, newUsername});
    localStorage.setItem('username', newUsername);
    usernameStore.set(newUsername);
    return response;
  }

  static async updatePassword(email: string, password: string, newPassword: string): Promise<AxiosResponse<PasswordResponse>> {
    const response = await $api.patch(`users/update-password`, {email, password, newPassword});
    console.log('updateUser response', response);
    return response;
  }


}
