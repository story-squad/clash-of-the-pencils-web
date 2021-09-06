import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Sticker } from '../../atoms';
import './styles/index.scss';

export interface DropZoneProps {
  name: string;
  type?: string;
  isDisabled?: boolean;
  placeholder?: React.ReactNode;
}

export default function DropZone({
  name,
  type,
  isDisabled = false,
  children,
  placeholder: placeholderNode = <Sticker type="dropZone" />,
}: React.PropsWithChildren<DropZoneProps>): React.ReactElement {
  return (
    <Droppable
      droppableId={name}
      direction="horizontal"
      type={type}
      isDropDisabled={isDisabled}
    >
      {(
        { innerRef, droppableProps, placeholder },
        { isDraggingOver, draggingFromThisWith, isUsingPlaceholder },
      ) => (
        <div
          className={classnames(
            'drop-zone',
            isDraggingOver && 'drag-over',
            draggingFromThisWith && 'drag-from',
          )}
          ref={innerRef}
          {...droppableProps}
        >
          {children}
          {isUsingPlaceholder && placeholderNode}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
}
