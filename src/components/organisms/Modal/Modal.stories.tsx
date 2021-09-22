import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { LoremIpsum } from '../../../data';
import { Button } from '../../atoms';
import Modal, { ModalComponentProps } from './Modal';
import './styles/storyStyles.scss';

const Template: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => setIsOpen(true);
  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} component={TestComponent} />
    </>
  );
};

function TestComponent({ closeModal }: ModalComponentProps) {
  return (
    <div className="modal-test-component">
      <h1>Modal Test!</h1>
      <p>{LoremIpsum}</p>
      <Button onClick={closeModal} size="sm">
        Okay!
      </Button>
    </div>
  );
}

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
} as Meta;
