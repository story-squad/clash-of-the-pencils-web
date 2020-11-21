import React, { useState } from 'react';
import { Submissions } from '../../../api';
import { Modal } from '../Modal';

import { BsArrowsFullscreen } from 'react-icons/bs';

interface SubCardProps extends Submissions.SubItem {
  canPreview?: boolean;
  onModalOpen?: () => void;
}

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
    <div className="sub-card">
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        component={() => <ModalImage {...sub} />}
        closable={true}
      />
      <img src={sub.src} alt="" />
      {canPreview && <BsArrowsFullscreen onClick={modalOpenHandler} />}
    </div>
  );
};

const ModalImage = (props: Submissions.SubItem) => {
  return (
    <div className="modal-image">
      <img src={props.src} alt="" />
    </div>
  );
};

export default SubCard;
