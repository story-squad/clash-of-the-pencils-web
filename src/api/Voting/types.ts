/** This should be an array, ordered from 1st-3rd place, of submission ids */
export type IPostVotesBody = number[];

export interface IVotingResponse {
  vote: IVote;
  message: string;
}

export interface IVote extends INewVote {
  id: number;
  created_at: Date;
}

export interface INewVote {
  userId?: number;
  firstPlaceId: number;
  secondPlaceId: number;
  thirdPlaceId: number;
}
