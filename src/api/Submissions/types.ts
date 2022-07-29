export interface ISubItem {
  id: number;
  user_id: number;
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
  user_id: number;
  prompt_id: number;
  sourceId?: number;
  rumbleId?: number;
}
