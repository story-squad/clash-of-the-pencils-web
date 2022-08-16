import { axiosWithAuth0 } from '../axiosWithConfig';
import { IPostVotesBody, IVote, IVotingResponse } from './types';

export const submit = async (
  votes: IPostVotesBody,
): Promise<IVotingResponse> => {
  const { data } = await axiosWithAuth0().post('/api/votes', { votes });
  return data;
};

export const getUserVoteForToday = async (): Promise<IVote | undefined> => {
  const { data } = await axiosWithAuth0().get('/api/votes');
  return data;
};
