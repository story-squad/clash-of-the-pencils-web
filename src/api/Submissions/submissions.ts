// import { AxiosResponse } from 'axios';
// import { axiosWithAuth } from './axiosWithConfig';

export interface SubItem {
  src: string;
  alt?: string;
  username?: string;
  age?: number;
}

const makeSubList = (numSubs: number): SubItem[] => {
  return [...new Array(numSubs)].map(() => ({
    src:
      'https://artprojectsforkids.org/wp-content/uploads/2020/05/Penguin.jpg',
    username: 'Catlady',
    age: 5,
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
