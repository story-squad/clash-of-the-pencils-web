import React from 'react';
import { TwoColumn } from '..';
import { ResendForm } from './ResendForm';
import { SendToForm } from './SendToForm';
import './styles/index.scss';
import { ActivationRequestFormProps } from './types';

export default function AccountActivation(
  formProps: ActivationRequestFormProps,
): React.ReactElement {
  return (
    <div className="account-activation">
      <h2>Activate Your Account!</h2>
      <TwoColumn
        left={<ResendForm {...formProps} />}
        right={<SendToForm {...formProps} />}
      />
    </div>
  );
}
