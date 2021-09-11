import { DateTime } from 'luxon';
import { atom } from 'recoil';

export const now = atom<DateTime>({
  key: 'appAtomCurrentDateTime',
  default: DateTime.now(),
});
