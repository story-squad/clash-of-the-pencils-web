import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

// TODO get some UX on this form
// These need to be redone, the aren't intended for resets they are intended
// to update a user's data, these endpoints are going to be changed to a new
// endpoint, likely just a PUT to `/api/users/:userId` with the desired change
// in the request body, for BOTH of them. Shouldn't be different. Maybe we can
// even combine the forms?
export const resetUsername = (
  body: UpdateUsernameBody,
): Promise<AxiosResponse<ResetReponse>> => {
  return axiosWithAuth().post('/email/resetusername', body);
};

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
