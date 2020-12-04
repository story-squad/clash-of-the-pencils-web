import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export const submit = (
  votes: unknown,
): Promise<AxiosResponse<VotingResponse>> => {
  return axiosWithAuth().post('/ranking', votes);
};

interface VotingResponse {
  tomorrow: string;
  message: string;
}
