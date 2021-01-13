import React, { useEffect, useState } from 'react';
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

  const keydownListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownListener);
    return () => document.removeEventListener('keydown', keydownListener);
  }, []);

  return (
    <div className={`sub-card${canPreview ? ' can-preview' : ''}`}>
      <div
        className={`card-img rotate-${sub.rotation}`}
        style={{ backgroundImage: `url(${sub.src})` }}
        onClick={modalOpenHandler}
      />
      <FullscreenImage
        {...sub}
        isVisible={showModal}
        setIsVisible={setShowModal}
      />
    </div>
  );
};

interface SubCardProps extends Submissions.SubItem {
  prompt: string;
  canPreview?: boolean;
  onModalOpen?: () => void;
}

export default SubCard;
