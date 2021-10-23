import { createContext, useContext } from 'react';
import { HeaderContextProps } from './types';

const HeaderContext = createContext<HeaderContextProps>({
  closeMenu: () => undefined,
  menuIsOpen: false,
  toggleMenu: () => undefined,
  openDashboard: () => undefined,
  logout: () => undefined,
});

export const { Provider: HeaderContextProvider } = HeaderContext;

export default function useHeaderContext(): HeaderContextProps {
  return useContext(HeaderContext);
}
