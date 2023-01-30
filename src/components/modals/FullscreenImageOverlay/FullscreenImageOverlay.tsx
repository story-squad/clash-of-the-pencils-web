import { classnames, useKey } from '@story-squad/react-utils';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FiMaximize,
  FiRotateCcw,
  FiX,
  FiZoomIn,
  FiZoomOut,
} from 'react-icons/fi';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useSetRecoilState } from 'recoil';
import { app } from '../../../state';
import './styles/index.scss';

const WRAPPER_ID = 'fullscreen-image=overlay';
export default function FullscreenImageOverlay(
  content: app.imageView.ImageViewContent,
): React.ReactElement {
  const [position, setPosition] = useState<number>();
  const [click, setClick] = useState<number>(1);
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

  const rotateImg = () => {
    if (click === 1) {
      setPosition(90);
      setClick(click + 1);
    } else if (click === 2) {
      setPosition(180);
      setClick(click + 1);
    } else if (click === 3) {
      setPosition(270);
      setClick(click + 1);
    } else if (click === 4) {
      setPosition(0);
      setClick(1);
    }
  };

  return (
    <TransformWrapper limitToBounds={false} centerOnInit={true}>
      {({ resetTransform, zoomIn, zoomOut }: TransformProps) => (
        <div className="fullscreen-image" id={WRAPPER_ID}>
          <div className="close-button" onClick={closeOverlay}>
            <FiX />
          </div>
          <div className="img-wrapper">
            <TransformComponent>
              <img
                src={content.source}
                alt={content.description}
                className={classnames(
                  content.rotation && `rotate-${content.rotation}`,
                  position && `rotate-${position}`,
                )}
              />
            </TransformComponent>
          </div>
          <div className="controls">
            <p>
              Use your mouse&apos;s scrollwheel to zoom in/out. To move the
              image click and drag.
            </p>
            <div className="bottom-controls">
              <button onClick={zoomOut} title="Zoom Out">
                <FiZoomOut />
              </button>
              <button onClick={zoomIn} title="Zoom In">
                <FiZoomIn />
              </button>
              <button onClick={resetTransform} title="Reset Zoom">
                <FiMaximize />
              </button>
              <button onClick={rotateImg}>
                <FiRotateCcw />
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
