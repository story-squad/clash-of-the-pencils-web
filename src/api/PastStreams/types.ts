export interface StreamURLItem {
  id: number;
  url: string;
  created_at: Date;
}

export type NewStreamURLItem = Pick<StreamURLItem, 'url'>;
