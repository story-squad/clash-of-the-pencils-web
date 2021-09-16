import { classnames } from '@story-squad/react-utils';
import React, { HTMLProps, useMemo } from 'react';
import { stickerFiles } from '../../../assets';
import './styles/index.scss';

export type StickerTypes = keyof typeof stickerFiles;
export interface StickerProps extends HTMLProps<HTMLSpanElement> {
  type: StickerTypes;
  dragRef?: React.Ref<HTMLSpanElement>;
  dragDisabled?: boolean;
}

const Sticker = ({
  type,
  dragRef,
  className,
  dragDisabled = false,
  ...props
}: StickerProps): React.ReactElement => {
  const src = useMemo(() => stickerFiles[type], [type]);
  return (
    <span
      className={classnames('sticker', className)}
      ref={dragDisabled ? null : dragRef}
      {...props}
    >
      <img src={src} alt={type} />
    </span>
  );
};

export default Sticker;
