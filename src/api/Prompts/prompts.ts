import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export interface PromptItem {
  id: number;
  prompt: string;
  submitted?: boolean;
}

export const getCurrent = (): Promise<AxiosResponse<PromptItem>> => {
  return axiosWithAuth().get('/api/contest/prompts/active');
};
