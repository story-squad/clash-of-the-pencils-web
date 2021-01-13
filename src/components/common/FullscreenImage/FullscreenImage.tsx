import React, { SetStateAction, useState } from 'react';
import {
  MdClose,
  MdInfo,
  MdInfoOutline,
  MdZoomIn,
  MdZoomOut,
  MdZoomOutMap,
} from 'react-icons/md';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Submissions } from '../../../api';

const FullscreenImage = (props: FullscreenImageProps): React.ReactElement => {
  const [showInfo, setShowInfo] = useState(true);

  const closeModal = () => {
    props.setIsVisible(false);
  };

  const toggleInfo = () => setShowInfo((cur) => !cur);

  return props.isVisible ? (
    <TransformWrapper
      options={{
        limitToBounds: false,
      }}
    >
      {({ zoomIn, zoomOut, resetTransform }: TransformProps) => (
        <div className="fullscreen-image">
          <div className="close-button">
            <MdClose onClick={closeModal} />
          </div>
          <div className="img-wrapper">
            <TransformComponent>
              <img
                src={props.src}
                alt="Submission displayed fullscreen"
                className={`rotate-${props.rotation}`}
              />
            </TransformComponent>
            {props.prompt && (
              <div className={`info${showInfo ? '' : ' hidden'}`}>
                <h2>Story Prompt</h2>
                <p>&ldquo;{props.prompt}&rdquo;</p>
                <p className="user-info">
                  SUBMISSION SCORE: <span>{Math.round(props.score)}</span>{' '}
                </p>
                <p className="user-info">
                  SUBMITTED BY: <span>{props.username}</span>
                </p>
              </div>
            )}
          </div>
          <div className="controls">
            <button onClick={zoomOut} title="Zoom Out">
              <MdZoomOut />
            </button>
            <button onClick={resetTransform} title="Reset Image">
              <MdZoomOutMap />
            </button>
            <button onClick={zoomIn} title="Zoom In">
              <MdZoomIn />
            </button>
            {props.prompt && (
              <button
                onClick={toggleInfo}
                title={`${showInfo ? 'Hide' : 'Show'} Info`}
              >
                {showInfo ? <MdInfo /> : <MdInfoOutline />}
              </button>
            )}
          </div>
        </div>
      )}
    </TransformWrapper>
  ) : (
    <></>
  );
};

interface FullscreenImageProps extends Submissions.SubItem {
  src: string;
  rotation: number;
  prompt: string;
  username: string;
  isVisible: boolean;
  score: number;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

interface TransformProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}

export default FullscreenImage;
