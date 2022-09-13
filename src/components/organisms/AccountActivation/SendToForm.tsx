import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { EmailForm } from '../../forms';
import { FormProps } from '../../forms/formTypes';

declare type SendToFormProps = FormProps & {
  sendToParent: boolean;
};

export function SendToForm({
  sendToParent = false,
  ...formProps
}: SendToFormProps): React.ReactElement {
  const methods = useForm();
  return (
    <div className="activation-form send-to-form">
      <h2>Send to New Email</h2>
      <p>
        Enter your{sendToParent && " guardian's"} email address and click the
        button below to request a new new activation email.
      </p>
      <FormProvider {...methods}>
        <EmailForm {...formProps} />
      </FormProvider>
    </div>
  );
}
