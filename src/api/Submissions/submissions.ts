import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { SubItem } from './imageLoader';

export const getMySubmissions = async (): Promise<SubItem[]> => {
  const { data }: AxiosResponse<SubItem[]> = await axiosWithAuth().get(
    '/contest/submissions/recent',
  );
  return data;
};

export const getTop3Subs = async (): Promise<SubItem[]> => {
  const { data }: AxiosResponse<SubItem[]> = await axiosWithAuth().get(
    '/contest/top',
  );
  return data;
};

export const uploadSubmission = (reqBody: FormData): Promise<AxiosResponse> => {
  // TODO
  return axiosWithAuth().post('/contest/submit', reqBody);
};
