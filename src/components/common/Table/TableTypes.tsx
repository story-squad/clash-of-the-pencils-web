import { Submissions } from '../../../api';

export interface TableRowProps {
  headings: TableHeadingProps[];
  row: TableItem;
}

export interface TableColProps {
  content: string | number;
}

export interface TableProps {
  rows: Submissions.ILeaderboardItem[];
  headings: TableHeadingProps[];
}

export interface TableHeadingProps {
  display: string;
  propName: string;
}

export interface TableItem extends Submissions.ILeaderboardItem {
  [key: string]: string | number;
}
