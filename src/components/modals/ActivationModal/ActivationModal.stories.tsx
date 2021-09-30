import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ActivationModal, { ActivationModalProps } from './ActivationModal';

const Template: Story<ActivationModalProps> = ({ success = true }) => {
  return (
    <div>
      <ActivationModal
        isOpen={true}
        setIsOpen={() => undefined}
        success={success}
      />
    </div>
  );
};

export const Success = Template.bind({});

export const Failure = Template.bind({});
Failure.args = { success: false };

export default {
  title: 'Views/ActivationView',
  component: ActivationModal,
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as Meta;
