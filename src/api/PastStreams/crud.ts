import { axiosWithAuth } from '../axiosWithConfig';
import { StreamURLItem } from './types';

export async function getLatest(): Promise<StreamURLItem> {
  const { data } = await axiosWithAuth().get(`/api/streams/latest`);
  return data;
}
