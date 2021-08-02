import { atom } from 'recoil';
import { Submissions } from '../../api';

export const list = atom<Submissions.ISubItem[] | null>({
  key: 'pastSubsList',
  default: null,
});
