export interface ISubItem {
  id: number;
  userId: number;
  codename: string;
  dob?: Date | string;
  src: string;
  rotation: number;
  prompt: string;
  score: number;
  rumbleId?: number;
  created_at: Date;
}

export interface ISubmission extends Omit<INewSubmission, 'transcription'> {
  id: number;
  created_at: Date;
}

export interface INewSubmission {
  s3Label: string;
  etag: string;
  transcription?: string;
  confidence: number;
  score: number;
  rotation: number;
  userId: number;
  promptId: number;
  sourceId?: number;
  rumbleId?: number;
}

export interface ILeaderboardItem {
  score: number;
  codename: string;
  rank: number;
}

export interface WeeklyLeaderboardItem extends ILeaderboardItem {
  timesVoted?: number;
  timesSubmitted?: number;
}
