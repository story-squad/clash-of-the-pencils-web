import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './styles/index.scss';

export interface DropZoneProps {
  name: string;
  type?: string;
  isDisabled?: boolean;
  className?: string;
}

export default function DropZone({
  name,
  type,
  isDisabled = false,
  className,
  children,
}: React.PropsWithChildren<DropZoneProps>): React.ReactElement {
  return (
    <Droppable droppableId={name} type={type} isDropDisabled={isDisabled}>
      {({ innerRef, droppableProps, placeholder }) => (
        <div
          className={classnames('drop-zone', className)}
          ref={innerRef}
          {...droppableProps}
        >
          {children}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
}
