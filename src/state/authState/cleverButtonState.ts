import { atom } from 'recoil';

export const cleverLoginButtonURL = atom<string | undefined>({
  key: 'cleverLoginButtonURL',
  default: undefined,
});

/**
 * This can be set in `RecoilRoot` initial state for testing and
 * for Storybook to prevent the API call to get the URL from
 * occurring.
 *
 * When setting this to true, make sure you also set
 * the URL!
 */
export const useMockCleverButton = atom<boolean>({
  key: 'useMockCleverButtonAtom',
  default: false,
});
