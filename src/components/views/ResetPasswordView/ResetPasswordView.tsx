import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PasswordForm, PasswordFormProps } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface ResetPasswordViewProps {
  submitHandler: PasswordFormProps['onSubmit'];
  openLogin: () => void;
}

export default function ResetPasswordView({
  submitHandler,
  openLogin,
}: ResetPasswordViewProps): React.ReactElement {
  const methods = useForm();
  return (
    <DashboardTemplate useStorySquadHeader className="reset-password-view">
      <div className="reset-password-header">
        <h2>Reset Your Password</h2>
        <p>
          Enter and confirm your new password below to update the password on
          your account!
        </p>
      </div>
      <FormProvider {...methods}>
        <PasswordForm onSubmit={submitHandler} onSuccess={openLogin} />
      </FormProvider>
    </DashboardTemplate>
  );
}
