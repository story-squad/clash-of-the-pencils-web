import { axiosWithAuth } from '../axiosWithConfig';
import { IPostVotesBody, IVotingResponse } from './types';

export const submit = async (
  votes: IPostVotesBody,
): Promise<IVotingResponse> => {
  const { data } = await axiosWithAuth().post('/api/clash/votes', { votes });
  return data;
};
