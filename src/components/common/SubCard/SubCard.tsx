import React, { useState } from 'react';
import { Submissions } from '../../../api';
import { Modal } from '../Modal';

interface SubCardProps {
  src: string;
  alt?: string;
  onModalOpen?: () => void;
}

const SubCard = ({
  src,
  alt = '',
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
      <img src={src} alt={alt} onClick={modalOpenHandler} />
    </div>
  );
};

const ModalImage = (props: Submissions.SubItem) => {
  return (
    <>
      <img src={props.src} alt={props.alt} />
    </>
  );
};

export default SubCard;
