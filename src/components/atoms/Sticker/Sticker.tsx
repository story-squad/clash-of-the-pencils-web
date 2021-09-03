import React, { useMemo } from 'react';
import { stickerSVGs } from '../../../assets';

export interface StickerProps {
  name: keyof typeof stickerSVGs;
}

const Sticker = ({ name }: StickerProps): React.ReactElement => {
  const SelectedSticker = useMemo(() => stickerSVGs[name], [name]);
  return <SelectedSticker />;
};

export default Sticker;
