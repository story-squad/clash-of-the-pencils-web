import { atom, selector } from 'recoil';
import { Prompts } from '../../api';

export const currentPrompt = atom<Prompts.IPrompt>({
  key: 'currentPrompt',
  default: selector({
    key: 'defaultCurrentPromptSelector',
    get: async () => {
      const prompt = await Prompts.getCurrent();
      return prompt;
    },
  }),
});
