import { selector } from 'recoil';
import { currentPrompt } from './promptAtoms';

export const promptId = selector<number | null>({
  key: 'promptId',
  get: ({ get }) => {
    const cur = get(currentPrompt);
    return cur ? cur.id : null;
  },
});
