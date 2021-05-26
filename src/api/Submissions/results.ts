import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { SubItem } from './imageLoader';

export const getWinner = async (): Promise<SubItem> => {
  const { data }: AxiosResponse<SubItem> = await axiosWithAuth().get(
    '/api/submissions/winner',
  );
  console.log(data);
  return data;
};
