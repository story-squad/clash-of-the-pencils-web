import { axiosWithAuth } from '../axiosWithConfig';
import { ISubItem } from './types';

export const getMySubmissions = async (userId: number): Promise<ISubItem[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/users/${userId}/submissions`,
  );
  return data;
};

export const uploadSubmission = async (
  reqBody: FormData,
): Promise<ISubItem> => {
  const { data } = await axiosWithAuth().post('/api/submissions', reqBody);
  return data;
};

export const getUserSubForToday = async (): Promise<ISubItem | undefined> => {
  const { data } = await axiosWithAuth().get('/api/submissions/today');
  return data;
};

export async function getById(subId: number): Promise<ISubItem> {
  const { data } = await axiosWithAuth().get(`/api/submissions/${subId}`);
  return data;
}

export const deleteSub = async (subId: number): Promise<void> => {
  const { data } = await axiosWithAuth().delete(`/api/submissions/${subId}`);
  return data;
};
