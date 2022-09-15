import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import {
  FiMaximize,
  FiRotateCcw,
  FiX,
  FiZoomIn,
  FiZoomOut,
} from 'react-icons/fi';
import { TransformComponent } from 'react-zoom-pan-pinch';
import { app } from '../../../state';
import { useState } from 'react';
import { classnames } from '@story-squad/react-utils';
interface FSIProps {
  config: {
    source: string;
    description: string;
    rotation?: number | string | undefined;
  };
}

const FullScreenImage = (props: FSIProps): React.ReactElement => {
  const { source, description, rotation } = props.config;
  const [position, setPosition] = useState<number>();
  const [click, setClick] = useState<number>(1);

  const closeOverlay = useSetRecoilState(app.imageView.close);

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
  /**
   * @title zoomOut
   * @description I have no clue where this function was coming from so it will need to be created
   */
  const zoomOut = () => {
    console.log('zoom out');
  };
  /**
   * @title zoomIn
   * @description I have no clue where this function was coming from so it will need to be createdaram {number} position
   */
  const zoomIn = () => {
    console.log('zoom in');
  };
  /**
   * @title resetTransform
   * @description I have no clue where this function was coming from so it will need to be created
   */
  const resetTransform = () => {
    console.log('reset');
  };
  return (
    <div className="fullscreen-image" id={'fullscreen-image=overlay'}>
      <div className="close-button" onClick={closeOverlay}>
        <FiX />
      </div>
      <div className="img-wrapper">
        <TransformComponent>
          <img
            src={source}
            alt={description}
            className={classnames(
              rotation && `rotate-${rotation}`,
              position && `rotate-${position}`,
            )}
          />
        </TransformComponent>
      </div>
      <div className="controls">
        <p>
          Use your mouse&apos;s scrollwheel to zoom in/out. To move the image
          click and drag.
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
  );
};

export default FullScreenImage;
