import { classnames } from '@story-squad/react-utils';
import React, { HTMLProps, useMemo } from 'react';
import { stickerSVGs } from '../../../assets';
import './styles/index.scss';

export type StickerTypes = keyof typeof stickerSVGs;
export interface StickerProps extends HTMLProps<HTMLSpanElement> {
  type: StickerTypes;
  dragRef?: React.Ref<HTMLSpanElement>;
}

const Sticker = ({
  type,
  dragRef,
  className,
  ...props
}: StickerProps): React.ReactElement => {
  const SelectedSticker = useMemo(() => stickerSVGs[type], [type]);
  return (
    <span className={classnames('sticker', className)} ref={dragRef} {...props}>
      <SelectedSticker />
    </span>
  );
};

export default Sticker;
