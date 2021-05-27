import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const getResetEmail = (email: string): Promise<AxiosResponse> => {
  return axiosWithoutAuth().get(`/api/auth/reset?email=${email}`);
};

export const updatePassword = (
  body: NewPasswordBody,
): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('/api/auth/reset', body);
};

export interface NewPasswordBody {
  email: string;
  code: string;
  password: string;
}
