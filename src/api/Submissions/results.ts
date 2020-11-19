import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { PlotParams } from 'react-plotly.js';

export const getHistogram = (): Promise<AxiosResponse<PlotParams>> => {
  return axiosWithAuth().get('/ranking/histogram');
};
