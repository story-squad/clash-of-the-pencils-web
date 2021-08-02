import { axiosWithoutAuth } from '../axiosWithConfig';
import { IPassResetPostBody } from './types';

export const getResetEmail = async ({
  email,
}: {
  email: string;
}): Promise<{ message: string }> => {
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
