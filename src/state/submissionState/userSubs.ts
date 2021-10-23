import { atom } from 'recoil';
import { factories } from '../helpers';
import { getById } from './submissions';

export const list = atom<number[] | undefined>({
  key: 'userSubsIdListAtom',
  default: undefined,
});

export const add = factories.AddSelectorFactory({
  getById,
  ids: list,
  key: 'addUserSubsSelector',
});
