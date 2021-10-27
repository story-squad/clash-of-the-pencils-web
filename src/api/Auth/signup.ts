import { AxiosResponse } from 'axios';
import { Users } from '../../api';
import { axiosWithoutAuth } from '../axiosWithConfig';
import { IAuthResponse } from './types';

export type { AxiosError } from 'axios';

export const signup = async (
  credentials: Users.INewUser,
): Promise<IAuthResponse> => {
  if (credentials.tos) Reflect.deleteProperty(credentials, 'tos');
  const { data } = await axiosWithoutAuth().post(
    '/api/auth/register',
    credentials,
  );
  return data;
};

/** Don't use this it doesn't work */
export const getRNGusername = async (): Promise<AxiosResponse<string>> => {
  const { data } = await axiosWithoutAuth().get(`/api/auth/randomusername`);
  return data;
};

// TODO do we still need this??
export const formatSignupBody = (formData: Users.INewUser): Users.INewUser => {
  return {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    parentEmail: formData.parentEmail,
    password: formData.password,
    codename: formData.codename,
    dob: formData.dob,
    roleId: Users.Roles.user, // TODO do we default this?
  };
};
