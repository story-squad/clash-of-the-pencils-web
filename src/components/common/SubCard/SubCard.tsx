import React, { useState } from 'react';
import { Submissions } from '../../../api';
import { Modal } from '../Modal';

import { BsArrowsFullscreen } from 'react-icons/bs';

interface SubCardProps {
  src: string;
  alt?: string;
  canPreview?: boolean;
  onModalOpen?: () => void;
}

const SubCard = ({
  src,
  alt = '',
  canPreview = true,
  onModalOpen = () => null,
}: SubCardProps): React.ReactElement => {
  const [showModal, setShowModal] = useState(false);

  const modalOpenHandler = () => {
    onModalOpen();
    setShowModal(true);
  };

  return (
    <div className="sub-card">
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        component={() => <ModalImage src={src} alt={alt} />}
        closable={true}
      />
      <img src={src} alt={alt} />
      {canPreview && <BsArrowsFullscreen onClick={modalOpenHandler} />}
    </div>
  );
};

const ModalImage = (props: Omit<Submissions.SubItem, 'username'>) => {
  return (
    <div className="modal-image">
      <img src={props.src} alt={props.alt} />
    </div>
  );
};

export default SubCard;
