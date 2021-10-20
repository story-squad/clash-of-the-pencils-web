import { atom } from 'recoil';
import { factories } from '../helpers';
import { getById } from './submissions';

export const list = atom<number[] | undefined>({
  key: 'winningSubmissionIdsAtom',
  default: undefined,
});

export const add = factories.AddSelectorFactory({
  key: 'addSubmissionsToWinnersSelector',
  getById,
  ids: list,
});
