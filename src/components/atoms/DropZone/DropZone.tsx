import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import { dnd } from '../../../state';
import { Sticker } from '../Sticker';
import './styles/index.scss';

export interface DropZoneProps {
  name: string;
  className?: string;
  children: (param: DropZoneChildrenFunctionParam) => React.ReactElement;
}

export interface DropZoneChildrenFunctionParam {
  contents: string | undefined;
  isEmpty: boolean;
  isDraggingOver: boolean;
  isUsingPlaceholder: boolean;
}

export default function DropZone({
  name,
  className,
  children,
}: DropZoneProps): React.ReactElement {
  const { contents, isEmpty } = useRecoilValue(dnd.dropZone(name));
  return (
    <Droppable
      droppableId={name}
      isDropDisabled={!!contents || !isEmpty}
      direction="horizontal"
    >
      {(
        { innerRef, droppableProps, placeholder },
        { draggingFromThisWith, isDraggingOver, isUsingPlaceholder },
      ) => (
        <div
          className={classnames('drop-zone', className)}
          ref={innerRef}
          {...droppableProps}
        >
          {children({ isEmpty, contents, isDraggingOver, isUsingPlaceholder })}
          {!!draggingFromThisWith && <Sticker type="dropZone" />}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
}
