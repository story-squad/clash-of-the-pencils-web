import { axiosWithoutAuth } from '../axiosWithConfig';
import { AxiosResponse } from 'axios';

export const login = async (credentials: LoginBody): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('/email/login', credentials);
};

export const activatedLogin = (token: string): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('/email/activatedLogin', { token });
};

export interface LoginBody {
  email: string;
  password: string;
}
