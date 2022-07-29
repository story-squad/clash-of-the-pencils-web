import { axiosWithAuth } from '../axiosWithConfig';
import { IPrompt } from './types';

export const getCurrent = async (): Promise<IPrompt> => {
  const { data } = await axiosWithAuth().get('/api/prompts/active');
  return data;
};

// export const getPhase = async (): Promise<PhaseType> => {
//   const { data } = await axiosWithoutAuth().get('/api/phase');
//   return data;
// };

// interface PhaseType {
//   phase: string;
//   start_time: string;
//   end_time: string;
//   active: boolean;
// }
