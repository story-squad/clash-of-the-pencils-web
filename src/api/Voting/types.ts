/** This should be an array, ordered from 1st-3rd place, of submission ids */
export type IPostVotesBody = number[];

export interface IVotingResponse {
  tomorrow: string;
  message: string;
}
