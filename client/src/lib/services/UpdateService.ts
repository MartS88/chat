import axios, {type AxiosResponse} from 'axios';
import $api from '$lib/http/auth';
import type {AuthResponse} from '$lib/types/AuthResponse';

export class UpdateService {
    static async updatePassword(email: string, password: string): Promise<AxiosResponse<string>> {
       const response = await $api.patch<string>(`/users/${email}/update-password`, { email, password });
       return response
    }

    static async updateEmail(email: string): Promise<AxiosResponse<AuthResponse>> {
        const response = await $api.patch<AuthResponse>(`/users/${email}/update-email`, { email });
        return response;
    }
}
