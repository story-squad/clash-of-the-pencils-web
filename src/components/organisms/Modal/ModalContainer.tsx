import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { app } from '../../../state';
import Modal from './Modal';

export default function ModalContainer(): React.ReactElement {
  const [isOpen, setIsOpen] = useRecoilState(app.modal.isOpen);
  const content = useRecoilValue(app.modal.content);

  return content ? (
    <Modal component={content} isOpen={isOpen} setIsOpen={setIsOpen} />
  ) : (
    <></>
  );
}
