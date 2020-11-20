import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { SubItem } from './submissions';
import { HistData } from '../../state/resultsState';

export const getHistogram = (): Promise<AxiosResponse<HistData>> => {
  return axiosWithAuth().get('/ranking/histogram');
};

export const getWinner = (): Promise<AxiosResponse<SubItem>> => {
  return axiosWithAuth().get('/ranking/winner');
};
