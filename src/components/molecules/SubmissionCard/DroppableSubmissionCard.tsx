import { classnames } from '@story-squad/react-utils';
import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { app, dnd, voting } from '../../../state';
import { time } from '../../../utils';
import { Card, Picture } from '../../atoms';
import './styles/index.scss';
import SubmissionCardFooter from './SubmissionCardFooter';

export interface DroppableSubmissionCardProps {
  submission: Submissions.ISubItem;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  disablePreview?: boolean;
  position: voting.Places;
  phase?: time.eventType;
  hasReadAll?: boolean;
  userHasVoted: boolean;
}

export default function DroppableSubmissionCard({
  submission,
  position,
  containerProps: { onClick, className, ...containerProps } = {},
  disablePreview,
  phase = 'vote',
  userHasVoted,
  hasReadAll = false,
}: DroppableSubmissionCardProps): React.ReactElement {
  const [hasRead, setHasRead] = useRecoilState(
    voting.hasReadSubInPosition(position),
  );

  const openAnImageFullscreen = useSetRecoilState(app.imageView.openImage);
  const openSubmission = () => {
    openAnImageFullscreen({
      description: submission.prompt,
      source: submission.src,
      rotation: submission.rotation,
    });
    setHasRead(true);
  };
  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick?.(e);
    if (!disablePreview) openSubmission();
  };

  const name = useMemo(
    () => `${voting.SUBMISSION_ZONE}-${position}`,
    [position, voting.SUBMISSION_ZONE],
  );
  const { contents, isEmpty } = useRecoilValue(dnd.dropZone(name));

  const age = useMemo(
    () =>
      Math.abs(
        Math.round(
          DateTime.fromISO(submission.dob as string).diffNow('years').years,
        ),
      ),
    [submission.dob],
  );

  return (
    <Droppable
      droppableId={name}
      isDropDisabled={!!contents && !isEmpty}
      direction="horizontal"
    >
      {(
        { droppableProps, innerRef, placeholder },
        { isDraggingOver, isUsingPlaceholder, draggingFromThisWith },
      ) => (
        <Card
          className={classnames('submission-card', className)}
          onClick={clickHandler}
          {...containerProps}
          innerRef={innerRef}
          {...droppableProps}
        >
          <Picture
            source={submission.src}
            description={`Hand-written story submitted by ${submission.codename}`}
            rotation={submission.rotation}
            disablePreview={disablePreview}
          />
          <SubmissionCardFooter
            age={age}
            codename={submission.codename}
            hasRead={hasRead}
            phase={phase}
            hasReadAll={hasReadAll}
            userHasVoted={userHasVoted}
            contents={contents}
            isDraggingOver={isDraggingOver}
            isEmpty={isEmpty}
            // placeholder={placeholder}
            isUsingPlaceholder={isUsingPlaceholder}
            // draggingFromThisWith={draggingFromThisWith}
          />
        </Card>
      )}
    </Droppable>
  );
}
