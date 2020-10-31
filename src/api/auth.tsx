import { axiosWithoutAuth } from './axiosWithConfig';
import { AxiosResponse } from 'axios';
export type { AxiosError } from 'axios';

interface SignupBody {
  email: string;
  username: string;
  password: string;
  parentEmail: string;
  age: number;
}
interface SignupFormState {
  email: string;
  username: string;
  password: string;
  parentEmail: string;
  ageStr: string;
  confirm: string;
}
export const formatSignupBody = (formData: SignupFormState): SignupBody => {
  const age = parseInt(formData.ageStr);
  return {
    email: formData.email,
    parentEmail: age < 13 ? formData.parentEmail : formData.email,
    password: formData.password,
    username: formData.username,
    age,
  };
};
export const signup = (credentials: SignupBody): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('/email/register', credentials);
};

export interface LoginBody {
  email: string;
  password: string;
}
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
