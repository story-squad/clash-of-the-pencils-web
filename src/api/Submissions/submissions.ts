import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export interface SubItem {
  id: number;
  userId: number;
  username: string;
  image: string;
  pages?: string;
}

export const getRecentSubsByChild = (): Promise<AxiosResponse<SubItem[]>> => {
  return axiosWithAuth().get('/upload/mystories');
};

export const getTop3Subs = (): Promise<AxiosResponse<SubItem[]>> => {
  return axiosWithAuth().get('/ranking');
};

export const uploadSubmission = (
  reqBody: FormData,
): Promise<AxiosResponse<unknown>> => {
  // TODO
  return axiosWithAuth().post('/upload', reqBody);
};
