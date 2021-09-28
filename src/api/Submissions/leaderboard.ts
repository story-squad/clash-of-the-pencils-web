import { axiosWithoutAuth } from '../axiosWithConfig';
import { ILeaderboardItem } from './types';

export const getDailyLeaderboard = async (): Promise<ILeaderboardItem[]> => {
  const { data } = await axiosWithoutAuth().get('/api/clash/leaderboard/daily');
  return data;
};

export const getWeeklyLeaderboard = async (): Promise<ILeaderboardItem[]> => {
  const { data } = await axiosWithoutAuth().get(
    '/api/clash/leaderboard/weekly',
  );
  return data;
};
