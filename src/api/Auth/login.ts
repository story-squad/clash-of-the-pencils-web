import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const login = async (credentials: LoginBody): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('/email/login', credentials);
};

export interface LoginBody {
  email: string;
  password: string;
}
