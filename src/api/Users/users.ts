import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { IUser } from './types';

/** Use this to update user data, make sure to pass in ID */
export const update = async ({
  id,
  ...changes
}: Partial<IUser>): Promise<IUser> => {
  if (!id) {
    console.error(
      new Error(
        "You did NOT pass in the ID to the user update function it won't work!",
      ),
    );
  }
  const { data } = await axiosWithAuth().put(`/api/users/${id}`, changes);
  return data;
};

// DONT USE THESE
// These need to be redone, the aren't intended for resets they are intended
// to update a user's data, these endpoints are going to be changed to a new
// endpoint, likely just a PUT to `/api/users/:userId` with the desired change
// in the request body, for BOTH of them. Shouldn't be different. Maybe we can
// even combine the forms?
/** DONT USE */
export const resetUsername = (
  body: UpdateUsernameBody,
): Promise<AxiosResponse<ResetReponse>> => {
  return axiosWithAuth().post('/email/resetusername', body);
};

/** DONT USE */
export const resetPassword = (
  body: UpdatePasswordBody,
): Promise<AxiosResponse<ResetReponse>> => {
  return axiosWithAuth().post('/email/resetpassword', body);
};

export interface ResetReponse {
  message: string;
}

// Edit Profile interface for update password
export interface UpdatePasswordBody {
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
}

// Edit Profile interface for update username
export interface UpdateUsernameBody {
  currentusername: string;
  newusername: string;
  confirmusername: string;
}
