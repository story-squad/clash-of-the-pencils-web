import { axiosWithAuth } from '../axiosWithConfig';

/**
 * No parameters needed, but you need to be logged in. This will resend
 * an activation email to the last email address associated to this
 * account to receive one.
 */
export async function resend(): Promise<void> {
  await axiosWithAuth().put(`/api/auth/activation`);
}

/**
 * @title sendTo
 * @param email The email address to send the activation email to.
 * @description No parameters needed, but you need to be logged in.
 * @returns {Promise<void>} No response body.
 * */
export const sendTo = async (email: string): Promise<void> => {
  await axiosWithAuth().post(`/api/auth/activation`, { email });
};
