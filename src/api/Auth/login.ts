import { axiosWithoutAuth } from '../axiosWithConfig';
import { AxiosResponse } from 'axios';

export const login = async (credentials: LoginBody): Promise<AxiosResponse> => {
  try {
    const { data } = await axiosWithoutAuth().get(
      `/email/activation/${credentials.email}`,
    );
    console.log({ data });
    if (data.validated && !data.validated) {
      return Promise.reject('You must validate your email before login.');
    } else {
      return axiosWithoutAuth().post('/email/login', credentials);
    }
  } catch (err) {
    console.log({ err });
    return Promise.reject('An unknown error occurred. Please try again.');
  }
};

export const activatedLogin = (token: string): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('/email/activatedLogin', { token });
};

export interface LoginBody {
  email: string;
  password: string;
}
