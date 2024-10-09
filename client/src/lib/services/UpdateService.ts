import axios, {type AxiosResponse} from 'axios';
import $api from '$lib/http/auth';

export class UpdateService {
    static async updatePassword(email: string, password: string): Promise<AxiosResponse<any>> {
       const response = await $api.patch<any>(`/users/${email}/update-password`, { email, password });
       return response
    }

    static async updateEmail(email: string): Promise<AxiosResponse<any>> {
        const response = await $api.patch<any>(`/users/${email}/update-email`, { email });
        localStorage.setItem('email', email);
        return response;
    }
}
