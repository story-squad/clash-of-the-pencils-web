import { Submissions } from '../../../api';
import { voting } from '../../../state';
import { time } from '../../../utils';

export interface BaseSubmissionCardProps {
  submission: Submissions.ISubItem;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  disablePreview?: boolean;
  position: voting.Places;
  phase?: time.eventType;
  hasReadAll?: boolean;
  userHasVoted: boolean;
}

export type SubmissionCardProps = Omit<
  BaseSubmissionCardProps,
  'position' | 'userHasVoted' | 'hasReadAll' | 'phase' | 'droppable'
>;

type BaseSubmissionCardContainerProps = Omit<
  BaseSubmissionCardProps,
  'submission'
> & {
  submissionId: number;
  droppable?: boolean;
};

type SubmissionCardContainerProps = Omit<
  BaseSubmissionCardContainerProps,
  'position' | 'userHasVoted'
> & {
  droppable: false;
};

type DroppableSubmissionCardProps = BaseSubmissionCardContainerProps & {
  droppable?: true;
};

export type SubmissionCardContainerPropSwitcher =
  | SubmissionCardContainerProps
  | DroppableSubmissionCardProps;
