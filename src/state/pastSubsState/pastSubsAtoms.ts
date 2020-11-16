import { atom } from 'recoil';
import { Submissions } from '../../api';

export const list = atom<Submissions.SubItem[] | null>({
  key: 'pastSubsList',
  default: null,
});
