import { axiosWithoutAuth } from '../axiosWithConfig';

/** Daily Leaderboard */

export interface ILeaderboardItem {
  score: number;
  codename: string;
  rank: number;
}

export const getDailyLeaderboard = async (
  params: LeaderboardParams = {},
): Promise<ILeaderboardItem[]> => {
  const query = getLbQuery(params);
  const { data } = await axiosWithoutAuth().get(
    `/api/leaderboard/daily?${query}`,
  );
  return data;
};

/** Weekly Leaderboard */

export interface WeeklyLeaderboardItem extends ILeaderboardItem {
  timesVoted: number;
  timesSubmitted: number;
}

export const getWeeklyLeaderboard = async (
  params: LeaderboardParams = {},
): Promise<WeeklyLeaderboardItem[]> => {
  const query = getLbQuery(params);
  const { data } = await axiosWithoutAuth().get(
    `/api/leaderboard/weekly?${query}`,
  );
  return data;
};

/** Pagination Query */

export interface LeaderboardParams {
  limit?: number;
  offset?: number;
  getBuffer?: boolean;
}

function getLbQuery({
  limit = 10,
  offset = 0,
  getBuffer = false,
}: LeaderboardParams): string {
  const query = new URLSearchParams({
    limit: `${limit}`,
    offset: `${offset}`,
    getBuffer: `${getBuffer}`,
  });
  return query.toString();
}
