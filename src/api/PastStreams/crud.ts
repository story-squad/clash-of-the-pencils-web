import { axiosWithAuth0 } from '../axiosWithConfig';
import { StreamURLItem } from './types';

export async function getLatest(): Promise<StreamURLItem> {
  const { data } = await axiosWithAuth0().get(`/api/streams/latest`);
  return data;
}
