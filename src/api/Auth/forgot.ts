import { axiosWithoutAuth } from '../axiosWithConfig';
import { IPassResetPostBody } from './types';

export interface ResetParams {
  email: string;
}

export const getPasswordReset = async ({
  email,
}: ResetParams): Promise<{ message: string }> => {
  const { data } = await axiosWithoutAuth().get(
    `/api/account/password?email=${email}`,
  );
  return data;
};

export const updatePassword = async (
  body: IPassResetPostBody,
): Promise<void> => {
  await axiosWithoutAuth().post('/api/account/password', body);
};

export const getCodenameReminder = async ({
  email,
}: ResetParams): Promise<{ message: string; recipient?: string }> => {
  const { data } = await axiosWithoutAuth().get(
    `/api/account/codename?email=${email}&origin=Clash`,
  );
  return data;
};
