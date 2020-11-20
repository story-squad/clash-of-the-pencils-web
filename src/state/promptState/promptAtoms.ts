import { atom } from 'recoil';
import { Prompts } from '../../api';

export const currentPrompt = atom<Prompts.PromptItem | null>({
  key: 'currentPrompt',
  default: null,
});
