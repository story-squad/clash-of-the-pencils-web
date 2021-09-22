import { Meta, Story } from '@storybook/react';
import React from 'react';
import Modal, { ModalProps } from './Modal';

const Template: Story<ModalProps> = ({ ...props }) => {
  return <Modal {...props} />;
};

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/Modal',
  component: Modal,
} as Meta;
