import { atom } from 'recoil';
import { PlotParams } from 'react-plotly.js';
import { Submissions } from '../../api';

export const histogram = atom<null | PlotParams>({
  key: 'histogramValues',
  default: null,
});

export const winner = atom<null | Submissions.SubItem>({
  key: 'winningStory',
  default: null,
});
