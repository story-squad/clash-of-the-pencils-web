import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { ISubItem } from './types';

export const getWinner = async (): Promise<ISubItem> => {
  const { data }: AxiosResponse<ISubItem> = await axiosWithAuth().get(
    '/api/clash/winners',
  );
  return data;
};

export const getTop3Subs = async (): Promise<ISubItem[]> => {
  const { data } = await axiosWithAuth().get('/api/clash/top');
  return data;
};
