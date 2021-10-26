import { atom } from 'recoil';
import { persist } from '../effects';

const LOCAL_STORAGE_TUTOIRAL_KEY = 'tutorial-Key';

export const showTutorial = atom<boolean>({
  key: 'tutorial-key-atom',
  default: true,
  effects_UNSTABLE: [persist(LOCAL_STORAGE_TUTOIRAL_KEY)],
});

export const currentMessageIndex = atom<number>({
  key: 'current-message',
  default: 0,
});

export const isOpen = atom<boolean>({
  key: 'tutorial-is-open',
  default: false,
});
