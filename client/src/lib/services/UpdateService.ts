import axios, {type AxiosResponse} from 'axios';
import $api from '$lib/http/auth';
import {usernameStore} from '../../store/store';


export class UpdateService {

  static async updateUsername(email: string, newUsername: string): Promise<AxiosResponse<any>> {
    const response = await $api.patch(`users/update-username`, { email, newUsername });
    localStorage.setItem('username',newUsername)
    usernameStore.set(newUsername)
    console.log('updateUser response',response);
    return response
  }


}
