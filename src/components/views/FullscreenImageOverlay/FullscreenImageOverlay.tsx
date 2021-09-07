import { useKey } from '@story-squad/react-utils';
import React, { useCallback, useEffect } from 'react';
import { FiMaximize, FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useSetRecoilState } from 'recoil';
import { app } from '../../../state';
import { Picture } from '../../atoms';
import './styles/index.scss';

const WRAPPER_ID = 'fullscreen-image=overlay';
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
      .getElementById(WRAPPER_ID)
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
      }}
    >
      {({ resetTransform, zoomIn, zoomOut }: TransformProps) => (
        <div className="fullscreen-image" id={WRAPPER_ID}>
          <div className="close-button" onClick={closeOverlay}>
            <FiX />
          </div>
          <div className="img-wrapper">
            <TransformComponent>
              <Picture {...content} />
            </TransformComponent>
          </div>
          <div className="controls">
            <div className="bottom-controls">
              <button onClick={zoomOut} title="Zoom Out">
                <FiZoomOut />
              </button>
              <button onClick={resetTransform} title="Reset Zoom">
                <FiMaximize />
              </button>
              <button onClick={zoomIn} title="Zoom In">
                <FiZoomIn />
              </button>
            </div>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
}

interface TransformProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}
