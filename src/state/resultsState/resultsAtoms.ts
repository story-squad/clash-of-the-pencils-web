import { atom } from 'recoil';
import { Submissions } from '../../api';

export type HistData = { data: Plotly.Data[]; layout: Partial<Plotly.Layout> };
export const histogram = atom<null | HistData>({
  key: 'histogramValues',
  default: null,
});

export const winner = atom<null | Submissions.SubItem>({
  key: 'winningStory',
  default: null,
});
