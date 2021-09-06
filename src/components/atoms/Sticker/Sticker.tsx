import React, { useMemo } from 'react';
import { stickerSVGs } from '../../../assets';

export type StickerTypes = keyof typeof stickerSVGs;
export interface StickerProps {
  type: StickerTypes;
  dragRef?: React.Ref<HTMLSpanElement>;
}

const Sticker = ({
  type,
  dragRef,
  ...props
}: StickerProps): React.ReactElement => {
  const SelectedSticker = useMemo(() => stickerSVGs[type], [type]);
  return (
    <span className="sticker" ref={dragRef} {...props}>
      <SelectedSticker />
    </span>
  );
};

export default Sticker;
