// import { AxiosResponse } from 'axios';
// import { axiosWithAuth } from './axiosWithConfig';

export interface SubItem {
  src: string;
  alt?: string;
}

export const getRecentSubsByChild = (
  childId: number,
  // ): Promise<AxiosResponse<SubItem[]>> => { // I think this will work?
): Promise<{ data: SubItem[] }> => {
  console.log(childId);
  const picList = [...new Array(10)].map(() => ({
    src:
      'https://artprojectsforkids.org/wp-content/uploads/2020/05/Penguin.jpg',
  }));

  return Promise.resolve({ data: picList });
};
