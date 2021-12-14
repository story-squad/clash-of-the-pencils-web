import React, { useState } from 'react';
import { ConfirmationModal } from '../../components/modals/';
import { UseConfirmationModalParams } from './types';

export default function useConfirmationModal(
  modalProps: UseConfirmationModalParams,
): [modalComponent: React.ReactElement, openModal: () => void] {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openConfirmationModal = () => setModalIsOpen(true);
  return [
    <ConfirmationModal
      key={modalProps.key || 0}
      isOpen={modalIsOpen}
      setIsOpen={setModalIsOpen}
      {...modalProps}
    />,
    openConfirmationModal,
  ];
}
