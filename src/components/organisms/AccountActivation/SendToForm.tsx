import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Auth } from '../../../api';
import { EmailForm } from '../../forms';
import { ActivationRequestFormProps } from './types';

export function SendToForm(
  formProps: ActivationRequestFormProps,
): React.ReactElement {
  const methods = useForm();

  return (
    <div className="activation-form send-to-form">
      <h2>Send to New Email</h2>
      <p>
        Enter an email address and click the button below to send an activation
        email to a different email address than before.
      </p>
      <FormProvider {...methods}>
        <EmailForm onSubmit={Auth.activation.sendTo} {...formProps} />
      </FormProvider>
    </div>
  );
}
