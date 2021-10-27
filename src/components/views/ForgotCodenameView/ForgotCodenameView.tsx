import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { EmailForm, EmailFormProps } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export type ForgotCodenameViewProps = EmailFormProps;

export default function ForgotCodenameView({
  ...formProps
}: ForgotCodenameViewProps): React.ReactElement {
  const methods = useForm();
  return (
    <DashboardTemplate useStorySquadHeader className="forgot-codename-view">
      <div className="forgot-codename-header">
        <h2>Forgot Your Codename?</h2>
        <p>
          Enter your email address. If your email address is correct, we will
          send you an email with a helpful codename&nbsp;reminder!
        </p>
      </div>
      <FormProvider {...methods}>
        <EmailForm {...formProps} />
      </FormProvider>
    </DashboardTemplate>
  );
}
