import React, { useState } from 'react';
import { Submissions } from '../../../api';
import { Modal } from '../Modal';

import { BsArrowsFullscreen } from 'react-icons/bs';

interface SubCardProps extends Submissions.SubItem {
  canPreview?: boolean;
  onModalOpen?: () => void;
}

const SubCard = ({
  image,
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
        component={() => <ModalImage image={image} />}
        closable={true}
      />
      <img src={image} alt="" />
      {canPreview && <BsArrowsFullscreen onClick={modalOpenHandler} />}
    </div>
  );
};

const ModalImage = (props: Pick<Submissions.SubItem, 'image'>) => {
  return (
    <div className="modal-image">
      <img src={props.image} alt="" />
    </div>
  );
};

export default SubCard;
