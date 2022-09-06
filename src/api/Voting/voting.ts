import { axiosWithAuth } from '../axiosWithConfig';
import { IPostVotesBody, IVote, IVotingResponse } from './types';

export const submit = async (
  votes: IPostVotesBody,
): Promise<IVotingResponse> => {
  const { data } = await axiosWithAuth().post('/api/votes', { votes });
  return data;
};

export const getUserVoteForToday = async (): Promise<IVote | undefined> => {
  const { data } = await axiosWithAuth().get('/api/votes');
  return data;
};
