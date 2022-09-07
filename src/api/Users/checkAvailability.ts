import { axiosWithoutAuth } from '../axiosWithConfig';

export async function isCodenameAvailable(codename: string): Promise<boolean> {
  console.log('RUNNING CODENAME CHECKER');
  const { data } = await axiosWithoutAuth().get(
    `/api/users/availability?codename=${codename}`,
  );
  return data.CodeNameorEmailavailable;
}

// Not going to need this since Auth0 handles it
/**
 * @function isEmailAvailable
 * @deprecated Login is handled by Auth0
 * @async
 * @param email {string} - The email to check
 * @returns {Promise<boolean>} - Whether or not the email is available
 * @description Calls the API to check if the email is available
 */
export async function isEmailAvailable(email: string): Promise<boolean> {
  const { data } = await axiosWithoutAuth().get(
    `/api/users/availability?email=${email}`,
  );
  return data.CodeNameorEmailavailable;
}
