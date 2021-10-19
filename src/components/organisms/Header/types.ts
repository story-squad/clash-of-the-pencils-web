import { Users } from '../../../api';

export interface NavProps {
  user?: Omit<Users.IUser, 'password'> | undefined;
  closeMenu: () => void;
}
