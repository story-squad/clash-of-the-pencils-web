import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { SubItem } from './imageLoader';

export const getMySubmissions = async (userId: number): Promise<SubItem[]> => {
  const { data }: AxiosResponse<SubItem[]> = await axiosWithAuth().get(
    `/api/users/${userId}/submissions`,
  );
  return data;
};

export const getTop3Subs = async (): Promise<SubItem[]> => {
  const { data }: AxiosResponse<SubItem[]> = await axiosWithAuth().get(
    '/api/submissions/top',
  );
  return data;
};

export const uploadSubmission = (reqBody: FormData): Promise<AxiosResponse> => {
  // TODO
  return axiosWithAuth().post('/api/submissions', reqBody);
};
