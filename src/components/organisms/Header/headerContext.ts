import { createContext } from 'react';
import { HeaderContextProps } from './types';

const HeaderContext = createContext<HeaderContextProps>({
  closeMenu: () => undefined,
  menuIsOpen: false,
  toggleMenu: () => undefined,
  openDashboard: () => undefined,
});

export default HeaderContext;
