import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export interface SubItem {
  id: number;
  userId: number;
  username: string;
  image: string;
  pages?: string;
  src?: string;
}

export const getImageFromS3 = async (sub: SubItem): Promise<SubItem> => {
  const res: AxiosResponse<ArrayBuffer> = await axiosWithAuth().get(
    `/upload/image/${sub.image}`,
    {
      responseType: 'arraybuffer',
    },
  );
  const image = btoa(
    new Uint8Array(res.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );
  const src = `data:${res.headers[
    'content-type'
  ].toLowerCase()};base64,${image}`;
  return { ...sub, src };
};
