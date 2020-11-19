import { atom } from 'recoil';
import { PlotParams } from 'react-plotly.js';

export const values = atom<null | PlotParams>({
  key: 'histogramValues',
  default: null,
});
