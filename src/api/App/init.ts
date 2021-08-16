import { axiosWithoutAuth } from '../axiosWithConfig';

export default async function init(): Promise<{ a: string }> {
  const { data } = await axiosWithoutAuth().get('');
  return data;
}
