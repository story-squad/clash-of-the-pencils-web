import { createContext, useContext } from 'react';
import { Users } from '../../../api';

export interface HeaderContextProps {
  closeMenu: () => void;
  toggleMenu: () => void;
  menuIsOpen: boolean;
  openDashboard: () => void;
  user?: Users.IUser;
  logout: () => void;
  runTutorial: () => void;
}

const HeaderContext = createContext<HeaderContextProps>({
  closeMenu: () => undefined,
  menuIsOpen: false,
  toggleMenu: () => undefined,
  openDashboard: () => undefined,
  logout: () => undefined,
  runTutorial: () => undefined,
});

export const { Provider: HeaderContextProvider } = HeaderContext;

export default function useHeaderContext(): HeaderContextProps {
  return useContext(HeaderContext);
}
