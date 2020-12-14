import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export interface UserItem {
  email: string;
  newEmail: string;
}

export const udpateEmail = (): Promise<AxiosResponse<UserItem>> => {
  return axiosWithAuth().post('/email/updateEmail');
};
