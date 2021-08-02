import { Users } from '..';

export interface IAuthResponse {
  user: Omit<Users.IUser, 'password'>;
  token: string;
}

export interface ILoginBody {
  codename: string;
  password: string;
}

export interface IPassResetPostBody {
  email: string;
  password: string;
  code: string;
}
