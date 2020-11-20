import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export const submit = (votes: unknown): Promise<AxiosResponse<unknown>> => {
  return axiosWithAuth().post('/ranking', votes);
};
