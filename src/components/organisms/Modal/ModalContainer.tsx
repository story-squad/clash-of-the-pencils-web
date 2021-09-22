import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { app } from '../../../state';
import Modal from './Modal';

export default function ModalContainer(): React.ReactElement {
  const [isOpen, setIsOpen] = useRecoilState(app.modal.isOpen);
  const ModalContent = useRecoilValue(app.modal.content);

  return ModalContent ? (
    <Modal component={ModalContent} isOpen={isOpen} setIsOpen={setIsOpen} />
  ) : (
    <></>
  );
}
