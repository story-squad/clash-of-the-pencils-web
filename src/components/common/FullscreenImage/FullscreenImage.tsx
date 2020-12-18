import React, { SetStateAction } from 'react';
import { MdClose, MdZoomIn, MdZoomOut, MdZoomOutMap } from 'react-icons/md';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Submissions } from '../../../api';

const FullscreenImage = (props: FullscreenImageProps): React.ReactElement => {
  const closeModal = () => {
    props.setIsVisible(false);
  };

  return props.isVisible ? (
    <TransformWrapper>
      {({ zoomIn, zoomOut, resetTransform }: TransformProps) => (
        <div className="fullscreen-image">
          <div className="close-button">
            <MdClose onClick={closeModal} />
          </div>
          <div className="img-wrapper">
            <TransformComponent>
              <img src={props.src} alt="Submission displayed fullscreen" />
            </TransformComponent>
          </div>
          <div className="controls">
            <button onClick={zoomOut}>
              <MdZoomOut />
            </button>
            <button onClick={resetTransform}>
              <MdZoomOutMap />
            </button>
            <button onClick={zoomIn}>
              <MdZoomIn />
            </button>
          </div>
        </div>
      )}
    </TransformWrapper>
  ) : (
    <></>
  );
};

interface FullscreenImageProps extends Submissions.SubItem {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

interface TransformProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}

export default FullscreenImage;
