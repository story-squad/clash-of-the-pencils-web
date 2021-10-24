import { IAuthResponse, ILoginBody } from '../Auth/types';
import { axiosWithoutAuth } from '../axiosWithConfig';
import { Roles } from '../Users';
import { CleverAuthResponse } from './cleverTypes';

export const authorizeWithClever = async (
  code: string,
): Promise<CleverAuthResponse> => {
  const { data } = await axiosWithoutAuth().get(
    `/api/auth/o/clever?code=${code}`,
  );
  return data;
};

export const mergeAccounts = async (
  body: ILoginBody,
  cleverId: string,
): Promise<IAuthResponse> => {
  const { data } = await axiosWithoutAuth().post(
    `/api/auth/o/clever/merge?cleverId=${cleverId}`,
    body,
  );
  return data;
};

export const signupWithClever = async (
  body: Partial<ISignUpBody>,
  roleId: number,
  cleverId: string,
): Promise<IAuthResponse> => {
  const userType = roleId === Roles.user ? 'student' : Roles[roleId];
  const params = new URLSearchParams({
    userType,
    cleverId,
  });
  const { data } = await axiosWithoutAuth().post(
    `/api/auth/o/clever/signup?${params.toString()}`,
    body,
  );
  return data;
};

export const cleverButton = async (): Promise<{ url: string }> => {
  const { data } = await axiosWithoutAuth().get('/api/auth/o/clever/button');
  return data;
};

export interface ISignUpBody {
  firstname: string;
  lastname: string;
  codename: string;
  email: string;
  password: string;
  parentEmail: string;
  age: number;
}
