import { AxiosResponse } from 'axios';
import { Prompts } from '..';
import { axiosWithAuth } from '../axiosWithConfig';

export const submit = (
  votes: unknown,
): Promise<AxiosResponse<VotingResponse>> => {
  return axiosWithAuth().post('/ranking', votes);
};

interface VotingResponse {
  tomorrow: Prompts.PromptItem;
  message: string;
}
