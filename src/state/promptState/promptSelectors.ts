import { selector } from 'recoil';
import { currentPrompt } from './promptAtoms';

export const hasSubmitted = selector<boolean>({
  key: 'setPromptAsSubmitted',
  get: ({ get }) => {
    const cur = get(currentPrompt);
    return cur?.submitted || false;
  },
  set: ({ get, set }) => {
    const cur = get(currentPrompt);
    if (cur) set(currentPrompt, { ...cur, submitted: true });
  },
});
