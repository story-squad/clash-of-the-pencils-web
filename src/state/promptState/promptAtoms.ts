import { atom } from 'recoil';
import { Prompts } from '../../api';

export const currentPrompt = atom<Prompts.IPrompt | null>({
  key: 'currentPrompt',
  default: null,
});
