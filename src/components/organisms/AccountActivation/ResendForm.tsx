import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Auth } from '../../../api';
import { EmptyForm } from '../../forms';
import { ActivationRequestFormProps } from './types';

export function ResendForm({
  // sendToParent,
  ...formProps
}: ActivationRequestFormProps): React.ReactElement {
  const methods = useForm();
  return (
    <div className="activation-form resend-form">
      <h2>Resend Email</h2>
      <p>
        Click the button below to resend another activation email to the same
        email address that the last email was sent to.
      </p>
      <p>
        <em>Note:</em> if you did not receive an activation email when you
        signed up, this option might fail again!
      </p>
      <FormProvider {...methods}>
        <EmptyForm onSubmit={Auth.activation.resend} {...formProps} />
      </FormProvider>
    </div>
  );
}
