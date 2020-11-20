import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

// export interface SubItem {
//   src: string;
//   alt?: string;
//   username: string;
//   age?: number;
// }

export interface SubItem {
  id: number;
  userId: number;
  username: string;
  image: string;
  pages?: string;
}

const makeSubList = (numSubs: number): SubItem[] => {
  return [...new Array(numSubs)].map((x, i) => ({
    image:
      'https://artprojectsforkids.org/wp-content/uploads/2020/05/Penguin.jpg',
    username: 'Catlady',
    id: i,
    userId: i * 2,
  }));
};

export const getRecentSubsByChild = (
  childId: number,
  // ): Promise<AxiosResponse<SubItem[]>> => { // I think this will work?
): Promise<{ data: SubItem[] }> => {
  console.log(childId);
  const picList = makeSubList(10);

  return Promise.resolve({ data: picList });
};

export const getTop3Subs = (): Promise<{ data: SubItem[] }> => {
  const subList = makeSubList(3);

  return Promise.resolve({ data: subList });
};

// export const getTop3Subs = (): Promise<AxiosResponse<SubItem[]>> => {
//   return axiosWithAuth().get('/ranking');
// };

export const uploadSubmission = (
  reqBody: FormData,
): Promise<AxiosResponse<unknown>> => {
  // TODO
  return axiosWithAuth().post('/upload', reqBody);
};
