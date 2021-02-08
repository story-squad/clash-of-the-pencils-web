import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export const submit = (
  votes: { votes: number[] } | null,
): Promise<AxiosResponse<VotingResponse>> => {
  console.log({ votes });
  if (!votes || !votes.votes) return Promise.reject('Could not cast vote!');
  if (votes.votes.some((num) => isNaN(num)))
    return Promise.reject('You must vote for all three!');
  return axiosWithAuth().post('/api/contest/votes', votes);
};

interface VotingResponse {
  tomorrow: string;
  message: string;
}
