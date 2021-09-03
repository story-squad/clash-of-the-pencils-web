import React, { useMemo } from 'react';
import { stickerSVGs } from '../../../assets';

export interface StickerProps {
  type: keyof typeof stickerSVGs;
}

const Sticker = ({ type }: StickerProps): React.ReactElement => {
  const SelectedSticker = useMemo(() => stickerSVGs[type], [type]);
  return <SelectedSticker />;
};

export default Sticker;
