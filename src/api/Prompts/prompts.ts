import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export interface PromptItem {
  id: number;
  prompt: string;
  active: boolean;
  topThree: boolean;
  voting: boolean;
}

export const getCurrent = (): Promise<
  AxiosResponse<{ prompt: PromptItem }>
> => {
  return axiosWithAuth().get('/upload/prompt');
};
