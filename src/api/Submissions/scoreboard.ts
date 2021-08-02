import { axiosWithoutAuth } from '../axiosWithConfig';
import { ILeaderboardItem } from './types';

export const getScoreboard = async (): Promise<ILeaderboardItem[]> => {
  const { data } = await axiosWithoutAuth().get('/api/clash/leaderboard');
  return data;
};
