import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const login = async (
  credentials: LoginBody,
): Promise<AxiosResponse<LoginResponse>> => {
  return axiosWithoutAuth().post('/api/auth/login', credentials);
};

export interface LoginBody {
  codename: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
