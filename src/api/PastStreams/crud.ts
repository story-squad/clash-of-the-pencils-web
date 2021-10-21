import { axiosWithAuth } from '../axiosWithConfig';
import { StreamURLItem } from './types';

export async function getLatest(): Promise<StreamURLItem> {
  const { data } = await axiosWithAuth().get(`/api/clash/streams/latest`);
  return data;
}
