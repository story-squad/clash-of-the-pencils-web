import { atom, selector } from 'recoil';
import { messages, TutorialMessage } from '.';
import { persist } from '../effects';

const LOCAL_STORAGE_TUTOIRAL_KEY = 'tutorial-Key';

/**
 * Whether or not to show the tutorial on app load. Value is
 * saved across sessions.
 */
export const showTutorial = atom<boolean>({
  key: 'tutorial-key-atom',
  default: true,
  effects_UNSTABLE: [persist(LOCAL_STORAGE_TUTOIRAL_KEY)],
});

/**
 * When this is true, the tutorial modal is open. The modal is
 * present on any view using the `DashboardTemplate`
 */
export const isOpen = atom<boolean>({
  key: 'tutorial-is-open',
  default: false,
});

/**
 * The index of the currently in-view tutorial message
 */
export const currentMessageIndex = atom<number>({
  key: 'current-message',
  default: 0,
});

/**
 * Resets the tutorial to the first message and opens the modal
 */
export const runTutorial = selector<void>({
  key: 'resetAndRunTutorialSelector',
  get: () => undefined,
  set: ({ set, reset }) => {
    reset(currentMessageIndex);
    set(isOpen, true);
  },
});

export const currentMessage = selector<TutorialMessage>({
  key: 'currentMessageSelector',
  get: ({ get }) => messages[get(currentMessageIndex)],
});
