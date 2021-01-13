import React, { SetStateAction, useState } from 'react';
import {
  MdClose,
  MdExpandLess,
  MdExpandMore,
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
            <div className={`info${showInfo ? '' : ' hidden'}`}>
              <div className="info-left">
                <h2>Prompt</h2>
                {props.prompt && (
                  <p className="prompt">&ldquo;{props.prompt}&rdquo;</p>
                )}
              </div>
              <div className="info-right">
                {props.username && <p className="user">{props.username}</p>}
                {props.score && (
                  <p className="score">
                    - <strong>{Math.round(props.score)}</strong> points -
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="controls">
            <div className="top-controls">
              <button
                onClick={toggleInfo}
                title={`${showInfo ? 'Hide' : 'Show'} Info`}
              >
                {showInfo ? <MdExpandMore /> : <MdExpandLess />}
              </button>
            </div>
            <div className="bottom-controls">
              <button onClick={zoomOut} title="Zoom Out">
                <MdZoomOut />
              </button>
              <button onClick={resetTransform} title="Reset Image">
                <MdZoomOutMap />
              </button>
              <button onClick={zoomIn} title="Zoom In">
                <MdZoomIn />
              </button>
            </div>
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
