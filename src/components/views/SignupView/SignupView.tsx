import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignupForm } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';
import { useAuth0 } from '@auth0/auth0-react';

const defaultUserValues: {
  email: string;
  firstName: string;
  lastName: string;
} = {
  email: '',
  firstName: '',
  lastName: '',
};

export default function SignupView(): React.ReactElement {
  const methods = useForm({
    defaultValues: defaultUserValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const { logout } = useAuth0();
  /**
   * @title handleCancel
   * @description Cancels the signup process by clearing web storage, logging the user out of Auth0, and redirecting them to the home page.
   */
  const handleCancel = () => {
    sessionStorage.clear();
    localStorage.clear();
    logout();
  };

  return (
    <DashboardTemplate useStorySquadHeader className="signup-view">
      <div className="signup-header">
        <h2>Complete Your Registration</h2>
      </div>
      <FormProvider {...methods}>
        <SignupForm />
      </FormProvider>
      <button onClick={handleCancel}>Cancel Registration</button>
    </DashboardTemplate>
  );
}
