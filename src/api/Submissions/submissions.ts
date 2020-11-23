import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { getImageFromS3, SubItem } from './imageLoader';

export const getRecentSubsByChild = async (): Promise<SubItem[]> => {
  const { data }: AxiosResponse<SubItem[]> = await axiosWithAuth().get(
    '/upload/mystories',
  );
  const processedStories = data.map((sub) => getImageFromS3(sub));
  return Promise.all(processedStories);
};

export const getTop3Subs = async (): Promise<SubItem[]> => {
  const { data }: AxiosResponse<SubItem[]> = await axiosWithAuth().get(
    '/ranking',
  );
  const processedStories = data.map((sub) => getImageFromS3(sub));
  return Promise.all(processedStories);
};

export const uploadSubmission = (
  reqBody: FormData,
): Promise<AxiosResponse<unknown>> => {
  // TODO
  return axiosWithAuth().post('/upload', reqBody);
};
