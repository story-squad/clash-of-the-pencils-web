import { AxiosResponse } from 'axios';
import { HistData } from '../../state/resultsState';
import { axiosWithAuth } from '../axiosWithConfig';
import { getImageFromS3, SubItem } from './imageLoader';

export const getHistogram = (): Promise<AxiosResponse<HistData>> => {
  return axiosWithAuth().get('/ranking/histogram');
};

export const getWinner = async (): Promise<SubItem> => {
  const { data }: AxiosResponse<SubItem> = await axiosWithAuth().get(
    '/ranking/winner',
  );
  return getImageFromS3(data);
};
