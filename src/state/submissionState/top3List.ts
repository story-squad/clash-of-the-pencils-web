import { atom } from 'recoil';
import { factories } from '../helpers';
import { getById } from './submissions';

/** A list of submissions ids of the top 3 subs */
export const list = atom<number[] | undefined>({
  key: 'top3SubmissionIdsAtom',
  default: undefined,
});
/** Add submissions to the top 3 id array */
export const add = factories.AddSelectorFactory({
  key: 'addSubmissionsToTop3Selector',
  getById,
  ids: list,
});
