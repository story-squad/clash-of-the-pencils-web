import { atom } from 'recoil';
import { Submissions } from '../../api';

export const winner = atom<null | Submissions.SubItem>({
  key: 'winningStory',
  default: null,
});
