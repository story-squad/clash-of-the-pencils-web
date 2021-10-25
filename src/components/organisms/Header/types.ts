import { Users } from '../../../api';

export interface HeaderContextProps {
  closeMenu: () => void;
  toggleMenu: () => void;
  menuIsOpen: boolean;
  openDashboard: () => void;
  user?: Users.IUser;
  logout: () => void;
}
