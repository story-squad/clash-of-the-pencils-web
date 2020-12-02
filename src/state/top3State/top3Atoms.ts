import { atom } from 'recoil';
import { Submissions } from '../../api';

const makeTop3 = (userId: number) => {
  const src = 'https://i.redd.it/54awv7jxe4e41.jpg';
  return [...new Array(3)].map((x, i) => ({
    id: i + 1,
    image: '',
    username: 'TestUsername',
    userId: userId,
    src: src,
  }));
};

// const top3InitState = null;
const top3InitState: Submissions.SubItem[] = makeTop3(14);

export const top3List = atom<Submissions.SubItem[] | null>({
  key: 'top3List',
  default: top3InitState,
});

const initialHasReadState = [false, false, false];
export const hasReadState = atom<boolean[]>({
  key: 'hasRead',
  default: initialHasReadState,
});

export const hasFinishedReadingState = atom<boolean>({
  key: 'hasFinishedReading',
  default: false,
});
