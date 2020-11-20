import { atom } from 'recoil';
import { PlotParams } from 'react-plotly.js';
import { Submissions } from '../../api';

export type HistData = Pick<PlotParams, 'data' | 'layout'>;
export const histogram = atom<null | HistData>({
  key: 'histogramValues',
  default: null,
});

export const winner = atom<null | Submissions.SubItem>({
  key: 'winningStory',
  default: null,
});
