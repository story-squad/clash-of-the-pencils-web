import React, { useState } from 'react';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { Submissions } from '../../../api';
import { FullscreenImage } from '../FullscreenImage';

const SubCard = ({
  canPreview = true,
  onModalOpen = () => null,
  ...sub
}: SubCardProps): React.ReactElement => {
  const [showModal, setShowModal] = useState(false);

  const modalOpenHandler = () => {
    onModalOpen();
    setShowModal(true);
  };

  return (
    <div className="sub-card" style={{ backgroundImage: `url(${sub.src})` }}>
      <FullscreenImage
        {...sub}
        isVisible={showModal}
        setIsVisible={setShowModal}
      />
      {canPreview && <BsArrowsFullscreen onClick={modalOpenHandler} />}
    </div>
  );
};

interface SubCardProps extends Submissions.SubItem {
  src: string;
  canPreview?: boolean;
  onModalOpen?: () => void;
}

export default SubCard;
