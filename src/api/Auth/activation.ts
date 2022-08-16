import { axiosWithAuth0 } from '../axiosWithConfig';

/**
 * No parameters needed, but you need to be logged in. This will resend
 * an activation email to the last email address associated to this
 * account to receive one.
 */
export async function resend(): Promise<void> {
  await axiosWithAuth0().put(`/api/auth/activation`);
}

/**
 * Must be logged in. Pass in an email address to send a new activation
 * email to.
 */
export async function sendTo({
  email: newEmail,
}: {
  email: string;
}): Promise<void> {
  await axiosWithAuth0().post(`/api/auth/activation`, { newEmail });
}
