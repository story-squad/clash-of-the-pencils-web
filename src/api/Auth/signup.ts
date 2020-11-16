import { axiosWithoutAuth } from '../axiosWithConfig';
import { AxiosResponse } from 'axios';
export type { AxiosError } from 'axios';

export const signup = (credentials: SignupBody): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('/email/register', credentials);
};

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

export interface SignupFormState {
  email: string;
  username: string;
  password: string;
  parentEmail: string;
  ageStr: string;
  confirm: string;
}

interface SignupBody {
  email: string;
  username: string;
  password: string;
  parentEmail: string;
  age: number;
}
