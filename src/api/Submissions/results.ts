import { AxiosResponse } from 'axios';
import { stringify } from 'query-string';
import { axiosWithAuth0 } from '../axiosWithConfig';
import { ISubItem } from './types';

export const getWinners = async ({
  limit = 7,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
} = {}): Promise<ISubItem> => {
  const query = stringify({ limit, offset });
  const { data }: AxiosResponse<ISubItem> = await axiosWithAuth0().get(
    `/api/winners?${query}`,
  );
  console.log({ query, data });
  return data;
};

export const getTop3Subs = async (): Promise<ISubItem[]> => {
  const { data } = await axiosWithAuth0().get('/api/top');
  return data;
};
