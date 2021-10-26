import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Auth } from '../../../api';
import { ForgotPasswordForm } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface ForgotPasswordViewProps {
  onSubmit?: (data: Auth.ResetEmailParams) => void | Promise<void>;
  openDashboard: () => void;
}

export default function ForgotPasswordView({
  openDashboard,
  onSubmit,
}: ForgotPasswordViewProps): React.ReactElement {
  const methods = useForm();

  const submitHandler = useCallback(onSubmit ?? Auth.getResetEmail, [
    onSubmit,
    openDashboard,
  ]);

  return (
    <DashboardTemplate className="forgot-password-view" useStorySquadHeader>
      <div className="forgot-password-header">
        <h2>Reset Your Password</h2>
        <p>
          Enter your email address. If your email address is correct, we will
          send you an email with a link to reset your&nbsp;password!
        </p>
      </div>
      <FormProvider {...methods}>
        <ForgotPasswordForm
          onSubmit={submitHandler}
          onSuccess={openDashboard}
        />
      </FormProvider>
    </DashboardTemplate>
  );
}
