import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Sticker } from '../Sticker';
import './styles/index.scss';

export interface DropZoneProps {
  name: string;
  type?: string;
  isDisabled?: boolean;
}

export default function DropZone({
  name,
  type,
  isDisabled = false,
  children,
}: React.PropsWithChildren<DropZoneProps>): React.ReactElement {
  return (
    <Droppable droppableId={name} type={type} isDropDisabled={isDisabled}>
      {({ innerRef, droppableProps, placeholder }, { isUsingPlaceholder }) => (
        <div className="drop-zone" ref={innerRef} {...droppableProps}>
          {children}
          {isUsingPlaceholder && <Sticker type="dropZone" />}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
}
