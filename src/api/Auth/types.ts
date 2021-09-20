import { AxiosError } from 'axios';
import { Users } from '..';

export interface IAuthResponse {
  user: Omit<Users.IUser, 'password'>;
  token: string;
}

export interface ILoginBody {
  codename?: string;
  email?: string;
  password: string;
}

export interface IPassResetPostBody {
  email: string;
  password: string;
  code: string;
}

export function isAxiosError(err: unknown): err is AxiosError {
  return (err as AxiosError)?.isAxiosError || false;
}
