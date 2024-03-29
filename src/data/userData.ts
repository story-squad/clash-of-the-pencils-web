import { Users } from '../api';

export default [
  {
    codename: 'A Codename',
    email: 'anemail@email.com',
    firstname: 'Firstname',
    lastname: 'Lastname',
    isValidated: true,
    roleId: 1,
    dob: new Date(2000, 1, 1).toISOString(),
    created_at: new Date(),
    updated_at: new Date(),
    id: 1,
  },
  {
    codename: 'CodenameTwo',
    email: 'anemawwww@email.com',
    firstname: 'Firstname',
    lastname: 'Lastname',
    isValidated: true,
    roleId: 2,
    dob: new Date(2000, 1, 1).toISOString(),
    created_at: new Date(),
    updated_at: new Date(),
    id: 2,
  },
  {
    codename: 'CodenameThree',
    email: 'email@email.com',
    firstname: 'Firstname3',
    lastname: 'Lastname3',
    isValidated: true,
    roleId: 3,
    dob: new Date(2000, 1, 1).toISOString(),
    created_at: new Date(),
    updated_at: new Date(),
    id: 3,
  },
] as Users.IUser[];
