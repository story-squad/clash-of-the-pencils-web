export interface IUser extends Omit<INewUser, 'parentEmail'> {
  id: number;
  isValidated: boolean;
  codename: string;
  email: string;
  roleId: number;
  dob: string;
  created_at: Date;
  updated_at: Date;
}

export interface INewUser extends IOAuthUser {
  email?: string;
  roleId: Roles & number;
  isValidated?: boolean;
  parentEmail?: string;
  dob?: Date | string;
  tos?: boolean;
}

export interface IOAuthUser {
  codename: string;
  firstName: string;
  lastname?: string;
  email?: string;
  password: string;
}

export enum Roles {
  user = 1,
  teacher,
  admin,
}
