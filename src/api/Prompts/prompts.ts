import { axiosWithAuth0 } from '../axiosWithConfig';
import { IPrompt } from './types';

export const getCurrent = async (): Promise<IPrompt> => {
  const { data } = await axiosWithAuth0().get('/api/prompts/active');
  return data;
};
