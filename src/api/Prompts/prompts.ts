import { axiosWithAuth } from '../axiosWithConfig';
import { IPrompt } from './types';

export const getCurrent = async (): Promise<IPrompt> => {
  const { data } = await axiosWithAuth().get('/api/prompts/active');
  return data;
};
