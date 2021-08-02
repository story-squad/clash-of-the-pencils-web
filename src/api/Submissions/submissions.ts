import { axiosWithAuth } from '../axiosWithConfig';
import { ISubItem } from './types';

export const getMySubmissions = async (userId: number): Promise<ISubItem[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/users/${userId}/submissions`,
  );
  return data;
};

export const uploadSubmission = (reqBody: FormData): Promise<ISubItem> => {
  return axiosWithAuth().post('/api/submissions', reqBody);
};
