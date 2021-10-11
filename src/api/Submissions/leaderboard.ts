import { axiosWithoutAuth } from '../axiosWithConfig';
import { ILeaderboardItem, WeeklyLeaderboardItem } from './types';

export interface LeaderboardPaginationParams {
  limit?: number;
  offset?: number;
}

export const getDailyLeaderboard = async (
  params: LeaderboardPaginationParams = {},
): Promise<ILeaderboardItem[]> => {
  const query = getPaginationQuery(params);
  const { data } = await axiosWithoutAuth().get(
    `/api/clash/leaderboard/daily?${query}`,
  );
  return data;
};

export const getWeeklyLeaderboard = async (
  params: LeaderboardPaginationParams = {},
): Promise<WeeklyLeaderboardItem[]> => {
  const query = getPaginationQuery(params);
  const { data } = await axiosWithoutAuth().get(
    `/api/clash/leaderboard/weekly?${query}`,
  );
  return data;
};

export function getPaginationQuery({
  limit = 10,
  offset = 0,
}: LeaderboardPaginationParams): string {
  const query = new URLSearchParams({
    limit: `${limit}`,
    offset: `${offset}`,
  });
  console.log({ query: query.toString() });
  return query.toString();
}
