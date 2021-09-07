import React from 'react';
import { useRecoilValue } from 'recoil';
import { app } from '../../../state';
import FullscreenImageOverlay from './FullscreenImageOverlay';

export default function FullscreenImageOverlayContainer(): React.ReactElement {
  const isOpen = useRecoilValue(app.imageView.isOpen);
  const content = useRecoilValue(app.imageView.content);

  if (isOpen && content) {
    return <FullscreenImageOverlay {...content} />;
  } else {
    return <></>;
  }
}
