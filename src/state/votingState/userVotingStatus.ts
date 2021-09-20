import { atomFamily, selector } from 'recoil';

export const hasReadSubInPosition = atomFamily<boolean, number>({
  key: 'hasReadSubInPositionAtomFamily',
  default: false,
});

export const hasReadAll = selector<boolean>({
  key: 'hasReadAllSubsSelector',
  get: ({ get }) => {
    const a = get(hasReadSubInPosition(1));
    const b = get(hasReadSubInPosition(2));
    const c = get(hasReadSubInPosition(3));
    return a && b && c;
  },
});
