import { useKey } from '@story-squad/react-utils';
import React, { useCallback, useEffect } from 'react';
import { TransformWrapper } from 'react-zoom-pan-pinch';
import { useSetRecoilState } from 'recoil';
import { app } from '../../../state';
import FullScreenImage from './FullScreenImage';
import './styles/index.scss';
export default function FullscreenImageOverlay(
  content: app.imageView.ImageViewContent,
): React.ReactElement {
  // Retrieve our close function
  const closeOverlay = useSetRecoilState(app.imageView.close);
  const memoizedCloseOverlay = useCallback(() => {
    closeOverlay(undefined);
  }, [closeOverlay]);

  // Close the overlay when escape is pressed
  useKey({ action: memoizedCloseOverlay, key: 'Escape' });

  // This works with the useEffect as a styling hack so that resize doesn't break everything
  const resizeHandler = () => {
    document
      .getElementById('fullscreen-image=overlay')
      ?.style.setProperty('height', `${window.innerHeight}px`);
  };
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <TransformWrapper
      options={{
        limitToBounds: false,
        centerContent: true,
      }}
    >
      <FullScreenImage config={content} />
    </TransformWrapper>
  );
}
