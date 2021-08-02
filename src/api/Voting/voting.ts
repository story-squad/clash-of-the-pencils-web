import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { IPostVotesBody, IVotingResponse } from './types';

export const submit = ({
  votes,
}: IPostVotesBody): Promise<AxiosResponse<IVotingResponse>> => {
  return axiosWithAuth().post('/api/clash/votes', votes);
};
